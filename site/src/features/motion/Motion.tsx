import { useEffect, useState } from "react";
import idle from "@showcase-assets/nanatau-state-idle.png";
import talk from "@showcase-assets/nanatau-state-talk.png";
import blink from "@showcase-assets/nanatau-state-blink.png";
import shy from "@showcase-assets/nanatau-state-shy.png";
import teary from "@showcase-assets/nanatau-state-teary.png";
import { repositoryUrl } from "../../shared/config/links";

type MotionState = {
  name: string;
  image: string;
  alt: string;
};

type SelectionSource = "auto" | "manual";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

const states = [
  { name: "IDLE", image: idle, alt: "待機中のななたう" },
  { name: "TALK", image: talk, alt: "会話中のななたう" },
  { name: "BLINK", image: blink, alt: "まばたきをするななたう" },
  { name: "SHY", image: shy, alt: "照れて頬を赤らめるななたう" },
  { name: "TEARY", image: teary, alt: "涙をこらえるななたう" },
] as const satisfies readonly MotionState[];

export default function Motion() {
  const [activeState, setActiveState] = useState<number>(4);
  const [autoPlay, setAutoPlay] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(reducedMotionQuery).matches,
  );
  const [selectionSource, setSelectionSource] = useState<SelectionSource>("auto");
  const currentState = states[activeState] ?? states[0];
  const isPlaying = autoPlay && !prefersReducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = window.setTimeout(() => {
      setSelectionSource("auto");
      setActiveState((state) => (state + 1) % states.length);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [activeState, isPlaying]);

  const selectState = (index: number) => {
    setSelectionSource("manual");
    setActiveState(index);
  };

  return (
    <section className="motion" id="motion">
      <div className="motion-stage">
        <div className="expression-card">
          <div className="expression-images" aria-live={selectionSource === "manual" ? "polite" : "off"}>
            {states.map((state, index) => (
              <img
                key={state.name}
                className={index === activeState ? "active" : ""}
                src={state.image}
                alt={state.alt}
                aria-hidden={index !== activeState}
                width="1254"
                height="1254"
                loading="lazy"
                fetchPriority="low"
              />
            ))}
          </div>
          <div className="live-indicator" aria-hidden="true">
            <i />
            <span>{isPlaying ? "自動再生" : "停止中"}</span>
          </div>
          <div className="expression-caption">
            <span>
              状態 <span className="state-number-enter" data-state-number key={currentState.name}>{String(activeState + 1).padStart(2, "0")}</span>
            </span>
            <strong className="state-name-enter" data-state-name key={currentState.name}>{currentState.name}</strong>
          </div>
        </div>
        <div className="state-panel">
          <div className="state-panel-head">
            <span className="state-label">EXPRESSION STATES</span>
            <button className="auto-toggle" type="button" aria-pressed={autoPlay} onClick={() => setAutoPlay((playing) => !playing)}>
              {isPlaying ? "一時停止" : "自動再生"}
            </button>
          </div>
          <ul className="state-list">
            {states.map((state, index) => (
              <li key={state.name}>
                <button className={index === activeState ? "active" : ""} type="button" aria-pressed={index === activeState} onClick={() => selectState(index)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{state.name}</strong>
                  <i />
                </button>
              </li>
            ))}
          </ul>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">モーションの制作工程を見る <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
