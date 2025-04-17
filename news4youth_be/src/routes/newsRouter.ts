import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// GET /news/:id
router.get("/news/:id", async (req: any, res: any) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "잘못된 ID입니다." });
  }

  try {
    const news = await prisma.post.findUnique({ where: { id } });

    if (!news) {
      return res.status(404).json({ message: "뉴스를 찾을 수 없습니다." });
    }

    return res.json(news);
  } catch (err) {
    console.error("뉴스 조회 실패:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

export default router;