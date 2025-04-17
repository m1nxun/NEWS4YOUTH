"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { env } from "process";

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    joinDate: "",
    bio: "",
  });
  const [post, setPost] = useState<
    { id: number; title: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      toast.error("로그인 후 이용해주세요.");
      router.push("/signin");
    } else {
      axios
        .post(`http://${env.BACKEND_URL}/userinfo`, { token: jwt })
        .then((res) => {
          if (res.status === 200) {
            setUser({
              name: res.data.userInfo.name,
              email: res.data.userInfo.email,
              joinDate: res.data.userInfo.createdAt,
              bio: res.data.userInfo.bio || "",
            });
            setPost(res.data.createdArticles);
          } else {
            toast.error("정보를 가져오는 데 실패했습니다.");
          }
        });
    }
  }, []);

  const handleSave = () => {
    const jwt = localStorage.getItem("token");
    axios
      .post(`http://${env.BACKEND_URL}/updateuserinfo`, {
        token: jwt,
        name: user.name,
        email: user.email,
        bio: user.bio,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("정보가 성공적으로 저장되었습니다!");
        } else {
          toast.error("저장에 실패했습니다.");
        }
        setTimeout(() => {
          router.push("/mypage");
        }, 1000);
      })

      .catch(() => {
        toast.error("서버 오류가 발생했습니다.");
      });
  };

  return (
    <>
      <div className="edit-wrapper">
        <h1 className="edit-title">마이페이지 정보수정</h1>

        <div className="user-section2">
          <label>
            이름:
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </label>
          <label>
            이메일:
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <label>
            소개글 (Bio):
            <textarea
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
          </label>
          <p className="join-date">
            가입일: {new Date(user.joinDate).toLocaleDateString()}
          </p>
        </div>

        <div className="actions">
          <button className="edit-btn" onClick={handleSave}>
            정보 저장
          </button>
        </div>
      </div>
    </>
  );
}
