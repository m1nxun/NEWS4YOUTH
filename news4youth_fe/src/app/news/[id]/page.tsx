"use client";

import { notFound, useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import "./page.css";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
  };
}
const hardReload = () => {
  window.location.reload();
};
export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [news, setNews] = useState<any>(null);
  const [comments, setComments] = useState<comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/news/${id}`,
          {
            cache: "no-store",
          }
        );

        if (!newsRes.ok) {
          return notFound();
        }

        const newsData = await newsRes.json();
        setNews(newsData);

        const commentRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/${id}`
        );

        if (commentRes) {
          if (commentRes.status === 400) {
            // 댓글이 없을 경우
            return setComments([]);
          }
          const commentData = await commentRes.data;
          console.log(commentData);
          setComments(commentData);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!news) {
    return <div>뉴스를 찾을 수 없습니다.</div>;
  }

  return (
    <>
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

      <div className="comment-wrapper">
        <h2>댓글 작성하기</h2>
        <form
          className="comment-form"
          onSubmit={async (e) => {
            const form = e.currentTarget;
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const content = formData.get("content");
            if (!content) {
              return;
            }
            try {
              const token = localStorage.getItem("token");
              if (!token) {
                throw new Error("토큰이 없습니다.");
              }
              const decoded: any = jwtDecode(token);
              console.log(decoded.id);
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/${id}`,
                {
                  content,
                  authorId: decoded.id,
                }
              );

              if (response.status === 200) {
                toast.success("댓글이 작성되었습니다.");
              }
              form.reset();
            } catch (error) {
              console.error("댓글 작성 실패:", error);
            }
            hardReload();
          }}
        >
          <textarea
            name="content"
            className="comment-textarea"
            placeholder="댓글을 입력하세요..."
            required
          />
          <button type="submit" className="comment-submit">
            댓글 작성
          </button>
        </form>

        <h2>댓글 목록</h2>
        {comments.length > 0 ? (
          [...comments]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((comment) => (
              <div key={comment.id} className="comment">
                <p className="comment-author">{comment.author.name}</p>
                <p className="comment-content">{comment.content}</p>
                <p className="comment-date">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>
    </>
  );
}
