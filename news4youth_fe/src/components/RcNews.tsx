// components/RecommendedArticles.tsx
"use client";
import styles from "./RcNews.module.css";

type Article = {
  id: number;
  title: string;
  description: string;
  category: string;
  link: string;
};

type Props = {
  articles: Article[];
};

export default function RecommendedArticles({ articles }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>이 주의 추천 기사</h2>
      <div className={styles.grid}>
        {articles.map((article) => (
          <a
            href={`/news/${article.link}`}
            key={article.id}
            className={styles.card}
          >
            {/* <img
              src={article.imageUrl}
              alt={article.title}
              className={styles.image}
            /> */}
            <div className={styles.content}>
              <h3 className={styles.title}>{article.title}</h3>
              <p className={styles.description}>{article.description}</p>
              <p className={styles.category}># {article.category}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
