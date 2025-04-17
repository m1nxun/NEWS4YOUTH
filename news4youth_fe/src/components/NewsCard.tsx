// components/NewsCard.js
interface NewsCardProps {
  title: string;
  summary: string;
  imageUrl: string;
}
import style from "./NewsCard.module.css";
export default function NewsCard({ title, summary, imageUrl }: NewsCardProps) {
  return (
    <div>
      <div className={style.card}>
        <img src={imageUrl} alt="newsimgs" />
        <h3>{title}</h3>
        <p>{summary}</p>
      </div>
    </div>
  );
}
