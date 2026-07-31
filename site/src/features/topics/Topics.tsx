type Topic = {
  index: string;
  meta: string;
  tag: string;
  title: string;
  description: string;
  href?: string;
};

const topics: readonly Topic[] = [
  { index: "01", meta: "キャラクター / 01", tag: "ビジュアル", title: "Approved artwork and references", description: "淡い黄色の髪と琥珀色の瞳。ななたうの姿を確かめるための、基準となる素材です。" },
  { index: "02", meta: "モーション / 02", tag: "PNGチューバー", title: "Motion, built from expression", description: "まばたき、照れ、こぼれそうな涙。小さな反応を、動きとして残していきます。" },
  { index: "03", meta: "日記 / 03", tag: "ブログ", title: "Notes from behind the character", description: "実験と発見の過程を、日々のメモとして綴っています。" },
]; 

export default function Topics() {
  return <section className="topics" id="topics"><div className="section-title"><p>ななたうの世界から、いま届くもの</p><h2>TOPICS</h2><span>01 — 03</span></div><ul className="topic-list">{topics.map((topic) => <li className="topic-item" key={topic.index}><div className="topic-index">{topic.index}</div><div className="topic-meta"><span>{topic.meta}</span><strong>{topic.tag}</strong></div><div className="topic-copy"><h3>{topic.title}</h3><p>{topic.description}</p></div>{topic.href ? <a className="topic-arrow" href={topic.href} aria-label={`${topic.title}を開く`}>↗</a> : null}</li>)}</ul></section>;
}
