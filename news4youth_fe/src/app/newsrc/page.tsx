// pages/admin/articles.tsx
"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { toast } from "react-toastify";

type Article = {
  id: number;
  title: string;
  content: string;
  category: string;
  recommended: boolean;
};

const ARTICLES_PER_PAGE = 6;

export default function ArticleAdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  function stripHtmlTags(html: string): string {
    if (!html) return "";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/searchall`)
      .then((res) => {
        if (res.status === 200 && Array.isArray(res.data.data)) {
          setArticles(res.data.data as Article[]);
        } else {
          setArticles([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [articles]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIdx = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(
    startIdx,
    startIdx + ARTICLES_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>추천 기사 설정</h1>
      <div className={styles.grid}>
        {currentArticles.map((article) => (
          <div key={article.id} className={styles.card}>
            <div className={styles.content}>
              <p className={article.recommended ? styles.recom : styles.recom2}>
                <strong>
                  {article.recommended ? " # 추천됨" : " # 추천되지 않음"}
                </strong>
              </p>
              <h3>{article.title}</h3>
              <p>
                {article.content.length > 40
                  ? `${stripHtmlTags(article.content).slice(0, 40)}...`
                  : article.content}
              </p>
            </div>
            <button
              onClick={() => {
                axios
                  .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recom`, {
                    id: article.id,
                  })
                  .then((res) => {
                    if (res.data == true) {
                      toast.error("추천 취소 되었습니다.");
                    } else if (res.data == false) {
                      toast.success("추천 처리 되었습니다.");
                    }
                  })
                  .catch((error) => {
                    console.error("Error deleting article:", error);
                    toast.error("처리 중 오류가 발생했습니다.");
                  });
              }}
              className={styles.button}
            >
              등록/삭제
            </button>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
}
