import { useEffect, useState } from "react";
import idle from "../../../../images/concept/showcase/nanatau-state-idle.png";
import talk from "../../../../images/concept/showcase/nanatau-state-talk.png";
import blink from "../../../../images/concept/showcase/nanatau-state-blink.png";
import shy from "../../../../images/concept/showcase/nanatau-state-shy.png";
import teary from "../../../../images/concept/showcase/nanatau-state-teary.png";
import { repositoryUrl } from "../../shared/config/links";

type MotionState = {
  name: string;
  image: string;
  alt: string;
};

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
  const currentState = states[activeState] ?? states[0];

  useEffect(() => {
    if (!autoPlay) return undefined;
    const timer = window.setTimeout(() => setActiveState((state) => (state + 1) % states.length), 2200);
    return () => window.clearTimeout(timer);
  }, [activeState, autoPlay]);

  return <section className="motion" id="motion"><div className="motion-stage"><div className="expression-card"><div className="expression-images" aria-live="polite">{states.map((state, index) => <img key={state.name} className={index === activeState ? "active" : ""} src={state.image} alt={state.alt} aria-hidden={index !== activeState} width="1254" height="1254" loading="lazy" fetchPriority="low" />)}</div><div className="live-indicator" aria-hidden="true"><i /><span>自動再生</span></div><div className="expression-caption"><span>状態 <span className="state-number-enter" data-state-number key={currentState.name}>{String(activeState + 1).padStart(2, "0")}</span></span><strong className="state-name-enter" data-state-name key={currentState.name}>{currentState.name}</strong></div></div><div className="state-panel"><div className="state-panel-head"><span className="state-label">EXPRESSION STATES</span><button className="auto-toggle" type="button" aria-pressed={autoPlay} onClick={() => setAutoPlay((playing) => !playing)}>{autoPlay ? "一時停止" : "自動再生"}</button></div><ul className="state-list">{states.map((state, index) => <li key={state.name}><button className={index === activeState ? "active" : ""} type="button" aria-pressed={index === activeState} onClick={() => setActiveState(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{state.name}</strong><i /></button></li>)}</ul><a href={repositoryUrl} target="_blank" rel="noreferrer">モーションの制作工程を見る <span>↗</span></a></div></div></section>;
}
