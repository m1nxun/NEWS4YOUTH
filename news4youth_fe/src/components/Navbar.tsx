"use client";

import styles from "./Navbar.module.css";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "스포츠", href: "/sports" },
  { name: "예술", href: "/arts" },
  { name: "과학", href: "/science" },
  { name: "역사", href: "/history" },
  { name: "교육", href: "/education" },
  { name: "경제", href: "/economy" },
  { name: "IT", href: "/it" },
];

export default function Navbar() {
  const [logined, setLogined] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [permission, setPermission] = useState("");
  const [hovered, setHovered] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const jwt =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || ""
          : "";
      if (jwt && jwt !== "signuping") {
        setLogined(true);
        setToken(jwt);
      } else {
        setLogined(false);
        setToken("");
      }
    };

    checkToken();
    const intervalId = setInterval(checkToken, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!token) return;
    try {
      const decoded: any = jwtDecode(token);
      setUsername(decoded.user_id);
      setPermission(decoded.permission);
    } catch {
      setUsername("");
      setPermission("");
    }
  }, [token]);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.topInner}>
          {logined ? (
            <div className={styles.userArea}>
              <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <span>환영합니다, {username}님</span>
                <span className={styles.divider}>|</span>
                <Link href="/logout">로그아웃</Link>
              </div>
              {hovered && (
                <div
                  className={styles.dropdown}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <Link href="/mypage">마이페이지</Link>
                  <Link href="/news/create">글 작성하기</Link>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link href="/signin">로그인</Link>
              <span className={styles.divider}>|</span>
              <Link href="/signup">회원가입</Link>
            </div>
          )}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <div className={styles.navContainer}>
            <div className={styles.logoArea} onClick={() => router.push("/")}>
              <Image
                src="/logo2.png"
                width={190}
                height={80}
                alt="News4Youth"
              />
            </div>

            <nav className={styles.nav}>
              <ul className={styles.menu}>
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <Link href={`/news/${cat.href}`}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
              <span className={styles.separator}></span>
              <button className={styles.plusBtn}>
                <span>NEWS4YOUTH Plus</span>
              </button>
            </nav>
          </div>

          <div className={styles.actions}>
            <Link className={styles.searchBtn} aria-label="검색" href={"/news"}>
              <Image
                src="/search_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
                width={24}
                height={24}
                alt="검색"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
