import { notFound } from "next/navigation";
import "./page.css";
import { env } from "process";
interface Props {
  params: {
    id: string;
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`${env.BACKEND_URL}/news/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const news = await res.json();

  return (
    <div className="news-wrapper">
      <h1>{news.title}</h1>
      <p className="date">
        작성일: {new Date(news.createdAt).toLocaleString()}
      </p>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
}
