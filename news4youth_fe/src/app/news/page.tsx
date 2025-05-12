"use client";
import { useEffect, useState } from "react";
import "./page.css";
import axios from "axios";
import Link from "next/link";
import { env } from "process";

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  category: string;
}

export default function NewsPage() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (query.length < 1) {
      setArticles([]);
      return;
    }

    const timeout = setTimeout(() => {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, { query })
        .then((res) => {
          if (res.status === 200 && Array.isArray(res.data.data)) {
            setArticles(res.data.data);
          } else {
            setArticles([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
        });
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  // HTML 제거 후 자르기 함수
  const stripHtmlAndTruncate = (html: string, length: number) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div className="spotlight-wrapper">
      <form
        style={{ width: "100%", maxWidth: "600px" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="spotlight-input"
          placeholder="🔍 기사 제목이나 내용을 검색하세요..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="news-content">
        {articles.length > 0 ? (
          articles.slice(0, 5).map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.id}`}
              className="news-card"
            >
              <div className="titlecontainer">
                <strong className="news-title">{article.title}</strong>
                <span className="news-category">{article.category}</span>
              </div>
              <p className="news-preview">
                {stripHtmlAndTruncate(article.content, 20)}
              </p>
            </Link>
          ))
        ) : (
          <p className="no-result">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
