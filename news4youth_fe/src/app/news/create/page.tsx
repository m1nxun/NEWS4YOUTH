"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TipTapEditorWithToolbar from "@/components/TipTapEditor";
import { toast } from "react-toastify";
export default function NewNews() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imgURL, setimgURL] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      console.log("no content");
      return;
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create/news`, {
        title,
        content,
        token: localStorage.getItem("token"),
        category,
        imgURL,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("뉴스 등록 완료!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
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
        placeholder="대표 이미지 URL을 입력하세요 (선택)"
        value={imgURL}
        onChange={(e) => setimgURL(e.target.value)}
        style={{
          width: "97.5%",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1rem",
        }}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          width: "97.5%",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1rem",
        }}
      >
        <option value="역사">역사</option>
        <option value="과학">과학</option>
        <option value="스포츠">스포츠</option>
        <option value="예술">예술</option>
        <option value="교육">교육</option>
        <option value="경제">경제</option>
        <option value="IT">IT</option>
      </select>

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
