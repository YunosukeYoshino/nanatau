import { repositoryUrl } from "../../shared/config/links";

export default function Announcement() {
  return <a className="announcement" href={repositoryUrl} target="_blank" rel="noreferrer"><span className="announcement-label">開発中</span><span className="announcement-text">MotionPNGTuberとキャラクター素材のアーカイブ</span><span className="announcement-arrow">リポジトリを見る ↗</span></a>;
}
