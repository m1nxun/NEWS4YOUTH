"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TipTapEditorWithToolbar from "@/components/TipTapEditor";
import { useCurrentEditor } from "@tiptap/react";
import { toast } from "react-toastify";
import { env } from "process";

export default function NewNews() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      console.log("no content");
      return;
    }
    axios
      .post(`http://${env.BACKEND_URL}/create/news`, {
        title,
        content,
        token: localStorage.getItem("token"),
        category,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("뉴스 등록 완료!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          console.log("test1");
          const ids = response.data.postId;
          router.push(`/news/${ids}`);
        } else {
          toast.error("뉴스 등록 실패", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error creating news:", error);
        toast.error("뉴스 등록 실패", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      });
  };

  return (
    <div style={{ marginTop: "4rem", padding: "1rem" }}>
      <h1>뉴스 작성</h1>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "97.5%",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1rem",
        }}
      />
      <input
        type="text"
        placeholder="키워드(카테고리)를 입력하세요"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          width: "97.5%",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1rem",
        }}
      />

      <TipTapEditorWithToolbar onChange={setContent} content={content} />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "0.5rem",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        뉴스 등록
      </button>
    </div>
  );
}
