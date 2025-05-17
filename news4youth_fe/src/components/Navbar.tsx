"use client";
import styles from "./Navbar.module.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Navbar() {
  // 메뉴 토글 상태 관리
  const [logined, setLogined] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [permission, setPermission] = useState("");
  const router = useRouter();
  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    // 브라우저 환경인지 확인
    if (typeof window === "undefined") return;

    // localStorage에서 토큰 가져오는 함수
    const fetchToken = () => {
      const jwt = localStorage.getItem("token");
      if (jwt == "signuping") return;
      if (jwt) setLogined(true);
      else setLogined(false);
      // 토큰이 있으면 상태 업데이트
      if (!jwt) return;
      setToken(jwt);
    };

    // 초기 실행
    fetchToken();
    // 5초마다 토큰 확인
    const intervalId = setInterval(fetchToken, 3000);

    // 언마운트 시 interval 정리
    return () => {
      console.log("clear");
      clearInterval(intervalId);
    };
  }, []);
  // 토큰이 있을 경우 decode
  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      setUsername(decoded.user_id);
      setPermission(decoded.permission);
    }
  }, [token]);

  return (
    <nav className={styles.navbar}>
      {/* 로고/브랜드 */}
      <Image
        src="/N4Y_1L_AO.png"
        width={"340"}
        height={"35"}
        alt="logo"
        onClick={() => {
          router.push("/");
        }}
        style={{
          cursor: "pointer",
        }}
      />

      {/* 햄버거 버튼 */}
      <button
        className={styles.navToggle}
        onClick={handleToggle}
        aria-label="Toggle menu"
      >
        <span className={styles.toggleBar}></span>
        <span className={styles.toggleBar}></span>
        <span className={styles.toggleBar}></span>
      </button>

      {/* 실제 메뉴 리스트 */}
      <ul className={`${styles.navMenu} ${menuOpen ? styles.show : ""}`}>
        <li className={styles.navItem}>
          <a href="/" className={styles.navLink}>
            홈
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/news" className={styles.navLink}>
            오량 소식
          </a>
        </li>
        <li className={styles.navItem}>
          {!logined ? (
            <a href="/signin" className={styles.navLink}>
              로그인
            </a>
          ) : (
            <div className={styles.navLink}>
              <strong>{username}</strong>님 환영합니다
              <div className={styles.dropdown}>
                <div>
                  <strong>{permission == "admin" ? "기자" : "회원"}</strong>{" "}
                  등급 입니다!
                </div>
                <a href="/mypage">마이페이지</a>
                {permission == "admin" ? (
                  <a href="/news/create">글작성하기</a>
                ) : (
                  ""
                )}
                {permission == "admin" ? (
                  <a href="/newsrc">추천 뉴스 설정</a>
                ) : (
                  ""
                )}
                <a
                  href="/logout"
                  style={{
                    color: "red",
                  }}
                >
                  로그아웃
                </a>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
