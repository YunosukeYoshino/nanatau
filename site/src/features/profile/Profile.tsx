import heroFullbody from "@showcase-assets/nanatau-hero-fullbody-v7.png";
import { repositoryUrl } from "../../shared/config/links";

export default function Profile() {
  return <section className="profile" id="profile"><div className="profile-word" aria-hidden="true">NANATAU</div><div className="profile-art"><div className="halo halo-a" /><div className="halo halo-b" /><img src={heroFullbody} alt="ななたうの全身キービジュアル" width="866" height="1817" loading="lazy" /></div><div className="profile-copy"><div className="profile-number">CHARACTER / 001</div><p className="profile-label">VIRTUAL CHARACTER</p><h2>nanatau</h2><p className="profile-kana">ナナタウ</p><p className="profile-lead">壊れそうで、眠たくて、少し恥ずかしがり。<br />それでも、今日も精一杯。</p><p className="profile-body">淡い黄色の髪と、光を重ねた琥珀色の瞳。うまくできない日にも、小さな勇気を胸に、ステージへ向かうバーチャルキャラクター。</p><dl className="profile-specs"><div><dt>髪</dt><dd>淡い黄色</dd></div><div><dt>瞳</dt><dd>琥珀色</dd></div><div><dt>気分</dt><dd>やさしい / 恥ずかしがり / 勇敢</dd></div></dl><a className="pill-link" href={repositoryUrl} target="_blank" rel="noreferrer">キャラクターアーカイブ <span>↗</span></a></div></section>;
}
