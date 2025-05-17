import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/recom", async (req: any, res: any) => {
    const postId = req.body.id;
    if (!postId) {
      return res.status(400).json({ message: "모든 필드를 입력해주세요" });
    }
  
    let temp = false;
  
    try {
      const check = await prisma.post.findFirst({
        where: {
          id: postId,
        },
        select: {
          recommended: true,
        },
      });
  
      if (check && check.recommended === true) {
        temp = true;
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 오류 (조회 중)" });
    }
  
    try {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          recommended: !temp,
        },
      });
      return res.status(201).json(temp);
    } catch (err) {
      return res.status(500).json({ message: "서버 오류 (업데이트 중)" });
    }
  });

export default router;