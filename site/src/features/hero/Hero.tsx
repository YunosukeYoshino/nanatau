import stageBanner from "@showcase-assets/nanatau-stage-banner-v3.png";
import { blogUrl, repositoryUrl } from "../../shared/config/links";
import Star from "../../shared/ui/Star";

function Header() {
  return (
    <header className="main-header">
      <a className="brand" href="#top" aria-label="nanatauのホーム"><Star /><span>nanatau</span></a>
      <nav aria-label="メインナビゲーション"><a href="#topics">トピックス</a><a href="#profile">プロフィール</a><a href="#motion">モーション</a><a href="#visuals">ビジュアル</a></nav>
      <a className="menu-button" href={repositoryUrl} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
    </header>
  );
}

export default function Hero() {
  return (
    <>
      <Header />
      <section className="kv" id="content" tabIndex={-1} aria-labelledby="hero-title">
        <img className="kv-image" src={stageBanner} alt="" width="1672" height="941" fetchPriority="high" />
        <div className="kv-grid" aria-hidden="true" />
        <div className="kv-copy">
          <div className="kv-kicker"><span>VIRTUAL CHARACTER</span><span>OFFICIAL ARCHIVE</span></div>
          <h1 id="hero-title"><span>nana</span><span>tau</span></h1>
          <p className="kv-jp">静かな勇気を、きらめきに。</p>
          <p className="kv-en">うまくできない日にも、ひとつずつ。</p>
          <div className="kv-actions"><a href="#profile">ななたうに会う <span>↓</span></a><a href={blogUrl} target="_blank" rel="noreferrer">公式ブログ <span>↗</span></a></div>
        </div>
        <div className="kv-side" aria-hidden="true"><span>淡いバターイエロー</span><span>やわらかなネイビー</span><span>あたたかな白</span></div>
        <div className="scroll-cue" aria-hidden="true"><span>下へスクロールして、見つける</span><i /></div>
      </section>
    </>
  );
}
