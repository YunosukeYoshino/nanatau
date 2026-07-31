import reference from "../../../../images/concept/showcase/nanatau-reference.png";
import stageBanner from "../../../../images/concept/showcase/nanatau-stage-banner-v3.png";

export default function Visuals() {
  return <section className="visuals" id="visuals"><div className="visuals-header"><div><span>CHARACTER VISUAL</span><h2>ONE HEART,<br />MANY EXPRESSIONS.</h2></div><p>キャラクター、モーション、日々の更新。どこにいても、やわらかさと輪郭は変わりません。</p></div><div className="visual-grid"><figure className="visual-main"><img src={reference} alt="ななたうの表情アップ" width="1024" height="1024" loading="lazy" /><figcaption><span>原案</span><strong>キーポートレート</strong></figcaption></figure><figure className="visual-wide"><img src={stageBanner} alt="ななたうのステージビジュアル" width="1672" height="941" loading="lazy" /><figcaption><span>公式</span><strong>ステージビジュアル</strong></figcaption></figure></div></section>;
}
