import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/comment/:id", async (req: any, res: any) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "잘못된 ID입니다." });
  }

  try {
    const comment = await prisma.comment.findMany({
        where: { postId: id },
        select: {
            id: true,
            content: true,
            createdAt: true,
            author:{
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    })
    if (!comment) {
      return res.status(400).json({ message: "댓글을 찾을 수 없습니다." });
    }
    return res.json(comment);
  } catch (err) {
    return res.status(500).json({ message: "서버 오류" });
  }
});
router.post("/comment/:id", async (req: any, res: any) => {
  const id = parseInt(req.params.id);
  const { content, authorId } = req.body;
  if (!content || !authorId) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요" });
  }
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: id,
        authorId: authorId,
      },
    });
    return res.status(201).json(comment);
  } catch (err) {
    return res.status(500).json({ message: "서버 오류" });
  }
});

export default router;