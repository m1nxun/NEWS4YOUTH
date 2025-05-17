import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/searchall", async (req: any, res: any) => {
    
    let data = await prisma.post.findMany()
    if (!data) {
        return res.status(404).json({ message: '뉴스를 찾을 수 없습니다.' });
    }
    res.status(200).json({ message: '뉴스 검색 결과', data: data });
});
router.get("/recomarts", async (req: any, res: any) => {
    let data = await prisma.post.findMany({
        where: {
            recommended: true,
        },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            category: true,
        }
    })
    if (!data) {
        return res.status(404).json({ message: '뉴스를 찾을 수 없습니다.' });
    }
    res.status(200).json({ message: '추천 뉴스 검색 결과', data: data });
});
export default router;