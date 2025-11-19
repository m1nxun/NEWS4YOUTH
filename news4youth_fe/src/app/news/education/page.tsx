"use client";

import axios from "axios";
import styles from "./PoliticsPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PoliticsPage() {
  function stripHtmlTags(html?: string): string {
    return html?.replace(/<[^>]*>?/gm, "") + "...";
  }
  const [HistoryData, setHistoryData] = useState<any[]>([]);
  const [TopHistoryData, setTopHistoryData] = useState<any[]>([
    {
      title: "Loading...",
      content: "Loading...",
      date: "Loading...",
    },
  ]);
  useEffect(() => {
    const getArticles = async () => {
      let data = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/find/edu`
      );
      let recommend = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/find/edurec`
      );
      if (data.status === 200 && recommend.status === 200) {
        setTopHistoryData(recommend.data);
        setHistoryData(data.data);
      } else {
        console.error("Failed to fetch articles");
      }
    };
    getArticles();
  }, []);
  return (
    <main className={styles.page}>
      <nav className={styles.navBar}>
        <h1 className={styles.title}>Education</h1>
      </nav>

      <section className={styles.topNews}>
        <div className={styles.topText}>
          <h2>{TopHistoryData[0]?.title}</h2>
          <p>{stripHtmlTags(TopHistoryData[0]?.content.slice(0, 80))}</p>
        </div>
        <Image src="/Daeshin.png" width={400} height={260} alt="main news" />
      </section>

      <div className={styles.contentArea}>
        <section className={styles.latest}>
          <h3>최신기사</h3>
          {HistoryData.map((item, idx) => (
            <article key={idx} className={styles.newsItem}>
              <Image
                src={item.Image || "Daeshin.png"}
                width={160}
                height={100}
                alt="thumb"
              />
              <Link href={`/news/${item.id}`}>
                <h4>{item.title}</h4>
                <p>{stripHtmlTags(item.content.slice(0, 80))}</p>
                <span className={styles.date}>{item.date}</span>
              </Link>
            </article>
          ))}
        </section>

        {/* <aside className={styles.popular}>
          <h3>정치 많이 본 기사</h3>
          <ol>
            {[
              "\"병상에서 김민석이 보이더라\" 이재명 최측근 된 '그날 뉴스'",
              '[단독] 尹 "나와 관련된 법안, 무리 안했으면…" 이 발언 뒤 방탄법 멈췄다',
              "[단독] 김민석 옛 불법정치자금 제공자, 작년까지 후원회장 했다",
              '[단독] 홍준표 내일 귀국…"나라 위한 일 고민" 보수재편 시동 거나',
              "\"병상에서 김민석이 보이더라\" 이재명 최측근 된 '그날 뉴스' (PLUS)",
            ].map((text, i) => (
              <li key={i}>
                <span className={styles.rank}>{i + 1}</span>
                <Link href="#">{text}</Link>
              </li>
            ))}
          </ol>
        </aside> */}
      </div>
    </main>
  );
}
