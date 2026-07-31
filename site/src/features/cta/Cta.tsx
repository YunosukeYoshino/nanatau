import { blogUrl, repositoryUrl } from "../../shared/config/links";
import Star from "../../shared/ui/Star";

export default function Cta() {
  return <section className="cta"><Star className="cta-star" /><p>FOLLOW THE STORY</p><h2>Today, she tries<br />one more time.</h2><div className="cta-links"><a href={blogUrl} target="_blank" rel="noreferrer">ブログを読む <span>↗</span></a><a href={repositoryUrl} target="_blank" rel="noreferrer">GitHubで見る <span>↗</span></a></div></section>;
}
