"use client";
import { toast } from "react-toastify";
import styles from "./signup.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { env } from "process";

export default function signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    code: "10103",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // 회원가입 로직
    if (formData.password !== formData.confirm) {
      toast.error("비밀번호가 일치하지 않습니다.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        code: formData.code,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("회원가입 완료!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        } else if (response.status === 400) {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        } else if (response.status === 500) {
          toast.error("서버 오류입니다. 관리자에게 문의해주세요", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        } else {
          toast.success("회원가입 완료!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          localStorage.setItem("token", response.data.token);
          router.push("/");
        }
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>

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
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
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

        <input
          className={styles.input}
          type="password"
          name="confirm"
          placeholder="비밀번호 확인"
          value={formData.confirm}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.button}>
          가입하기
        </button>
      </form>
    </div>
  );
}
