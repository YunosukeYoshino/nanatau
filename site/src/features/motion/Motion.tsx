import { useEffect, useState } from "react";
import neutral from "@showcase-assets/nanatau-avatar-neutral-720.webp";
import neutralLarge from "@showcase-assets/nanatau-avatar-neutral-1440.webp";
import blink from "@showcase-assets/nanatau-avatar-blink-720.webp";
import blinkLarge from "@showcase-assets/nanatau-avatar-blink-1440.webp";
import happy from "@showcase-assets/nanatau-avatar-happy-720.webp";
import happyLarge from "@showcase-assets/nanatau-avatar-happy-1440.webp";
import tetrisPoster from "@showcase-assets/nanatau-avatar-tetris-poster.jpg";
import danceTetris from "@avatar-videos/dance-tetris-expressions.mp4";
import { avatarArchiveUrl, avatarProductionUrl } from "../../shared/config/links";

type MotionState = {
  name: string;
  image: string;
  imageLarge: string;
  alt: string;
};

type SelectionSource = "auto" | "manual";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

const states = [
  { name: "通常", image: neutral, imageLarge: neutralLarge, alt: "目を開けた通常の表情のななたう3Dアバター" },
  { name: "まばたき", image: blink, imageLarge: blinkLarge, alt: "まばたきで両目を閉じたななたう3Dアバター" },
  { name: "笑顔", image: happy, imageLarge: happyLarge, alt: "目と口元をゆるめて笑うななたう3Dアバター" },
] as const satisfies readonly MotionState[];

export default function Motion() {
  const [activeState, setActiveState] = useState<number>(0);
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
    <section className="motion" id="motion" aria-labelledby="motion-title">
      <div className="motion-heading">
        <div>
          <p>3D AVATAR / EXPRESSIONS</p>
          <h2 id="motion-title">FACE &amp;<br />MOTION</h2>
        </div>
        <p>ふっと目を閉じて、にっこり笑って。<br />3Dになったななたうの表情と、ダンスに合わせた動きを見てください。</p>
      </div>
      <div className="motion-stage">
        <div className="expression-card">
          <div className="expression-images" aria-live={selectionSource === "manual" ? "polite" : "off"}>
            {states.map((state, index) => (
              <img
                key={state.name}
                className={index === activeState ? "active" : ""}
                src={state.image}
                srcSet={`${state.image} 720w, ${state.imageLarge} 1440w`}
                sizes="(max-width: 700px) min(calc(100vw - 76px), 302px), 415px"
                alt={state.alt}
                aria-hidden={index !== activeState}
                width="720"
                height="840"
                loading="lazy"
                fetchPriority="low"
              />
            ))}
          </div>
          <div className={`live-indicator${isPlaying ? " is-playing" : ""}`} aria-hidden="true">
            <i />
            <span>{isPlaying ? "自動切替" : "手動切替"}</span>
          </div>
          <div className="expression-caption">
            <span>
              表情 <span className="state-number-enter" data-state-number key={currentState.name}>{String(activeState + 1).padStart(2, "0")}</span>
            </span>
            <strong className="state-name-enter" data-state-name key={currentState.name}>{currentState.name}</strong>
          </div>
        </div>
        <div className="state-panel">
          <div className="state-panel-head">
            <h3 className="state-label">表情を選ぶ</h3>
            <button className="auto-toggle" type="button" aria-pressed={isPlaying} disabled={prefersReducedMotion} onClick={() => setAutoPlay((playing) => !playing)}>
              {prefersReducedMotion ? "手動切替中" : isPlaying ? "切替を停止" : "自動切替"}
            </button>
          </div>
          <p className="state-description">通常・まばたき・笑顔の静止画を切り替えて見られます。</p>
          {prefersReducedMotion && <p className="state-description">端末の設定に合わせて自動切替を止めています。</p>}
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
          <a href="#motion-video">ダンスで表情の動きを見る <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="motion-video" id="motion-video">
        <figure className="motion-video-player">
          <video
            controls
            playsInline
            preload="none"
            {...{ loading: "lazy" }}
            width="1080"
            height="1350"
            poster={tetrisPoster}
            aria-labelledby="motion-video-title"
            aria-describedby="motion-video-description motion-video-audio"
          >
            <source src={danceTetris} type="video/mp4" />
            <p>動画を再生できない場合は、<a href={danceTetris}>MP4ファイルを開いてください。</a></p>
          </video>
          <figcaption>約16秒 / 音あり <a href={danceTetris}>動画を直接開く <span aria-hidden="true">↗</span></a></figcaption>
        </figure>
        <div className="motion-video-copy">
          <p className="motion-video-label">DANCE / TETRIS</p>
          <h3 id="motion-video-title">表情もいっしょに、<br />踊る。</h3>
          <p id="motion-video-description">「テトリス」に合わせて踊るななたう。まばたきや笑顔が自然につながる様子を、短い動画にまとめました。</p>
          <p id="motion-video-audio">再生すると音が出ます。公式の伴奏音源を使用し、歌声は含まれていません。</p>
          <dl className="motion-video-credits">
            <div><dt>楽曲</dt><dd><a href="https://youtu.be/Soy4jGPHr3g" target="_blank" rel="noreferrer">テトリス / 柊マグネタイト ↗</a></dd></div>
            <div><dt>モーション</dt><dd><a href="https://booth.pm/ja/items/6438933" target="_blank" rel="noreferrer">八ツ橋まろん ↗</a></dd></div>
            <div><dt>モデル</dt><dd>ななたう（Nanatau）</dd></div>
          </dl>
          <div className="motion-video-links">
            <a href={avatarArchiveUrl} target="_blank" rel="noreferrer">表情と動画の一覧 <span aria-hidden="true">↗</span></a>
            <a href={avatarProductionUrl} target="_blank" rel="noreferrer">制作記録・クレジット <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
