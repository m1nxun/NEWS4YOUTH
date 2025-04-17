"use client";
import { toast } from "react-toastify";
import styles from "./signin.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { env } from "process";

export default function sigin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    axios
      .post(`http://${env.BACKEND_URL}/signin`, {
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("로그인 성공!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          console.log("로그인성공");
          localStorage.setItem("token", response.data.token);
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("아이디 또는 비밀번호가 틀립니다.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>관리자 로그인</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="username"
          placeholder="사용자명"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
}
