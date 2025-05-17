"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Link from "next/link";
import { env } from "process";

export default function MyPage() {
  const decode = (token: string) => {
    const decoded: any = jwtDecode(token);
    return decoded;
  };
  const router = useRouter();
  const [user, setuser] = useState({
    name: "",
    rank: "",
    email: "",
    joinDate: "",
    bio: "",
  });
  const [post, setpost] = useState<
    { id: number; title: string; createdAt: string }[]
  >([]);
  useEffect(() => {
    // check userinfo
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      toast.error("로그인 후 이용해주세요.");
      router.push("/signin");
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/userinfo`, {
        token: jwt,
      })
      .then((res) => {
        if (res.status === 200) {
          setuser({
            name: res.data.userInfo.name,
            email: res.data.userInfo.email,
            joinDate: res.data.userInfo.createdAt,
            bio: res.data.userInfo.bio,
            rank: decode(jwt as any).permission,
          });
          setpost(res.data.createdArticles);
          console.log(res.data);
        } else {
          toast.error("정보를 가져오는 데 실패했습니다.");
        }
      });
  }, []);

  return (
    <>
      <div className="mypage-wrapper">
        <h1 className="mypage-title">마이페이지</h1>

        <div className="user-section">
          <h2>
            {user.rank == "admin" ? "기자" : "회원"} {user.name}님, 안녕하세요
          </h2>
          <p className="email">📧 {user.email}</p>
          <p className="join-date">
            가입일: {new Date(user.joinDate).toLocaleDateString()}
          </p>
          {user.bio ? (
            <p className="bio">나의 한마디 : {user.bio}</p>
          ) : (
            <p className="bio">나의 한마디를 작성해보세요 !</p>
          )}
        </div>

        <div className="actions">
          <button
            className="edit-btn"
            onClick={() => {
              router.push("/edit");
            }}
          >
            정보 수정
          </button>
          <button
            className="logout-btn"
            onClick={() => {
              router.push("/logout");
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
      <div className="mypage-wrapper">
        <h1 className="mypage-title">
          {user.rank == "admin" ? "작성한 글" : "인재를 기다립니다!"}
        </h1>
        {user.rank == "admin"
          ? post.map((value) => (
              <Link
                className="user-section"
                key={value.id}
                href={`/news/${value.id}`}
              >
                <h2>{value.title}</h2>
                <p className="email mypage-title">
                  🗓 {new Date(value.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))
          : "NEWS4YOUTH 프로젝트에 참여해보세요!"}
      </div>
    </>
  );
}
