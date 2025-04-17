"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SpotlightSearch() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("token");
    toast.success("로그아웃 되었습니다.");
    router.push("/");
  }, []);
  return <></>;
}
