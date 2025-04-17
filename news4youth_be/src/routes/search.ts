import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post('/search', (req:any, res:any) => {
  const { query } = req.body;
    if(!query) {
        return res.status(400).json({ message: '올바르지 않은 접근 입니다' });
    }
    prisma.post.findMany({
        where: {
            OR: [
                { title: { contains: query } },
                { content: { contains: query } },
            ]
        },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            category: true,
        }
    }).then((data) => {
        if (!data) {
            return res.status(404).json({ message: '뉴스를 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: '뉴스 검색 결과', data: data });
    }
    ).catch((error) => {
        res.status(500).json({ message: 'Internal server error', error });
    }
    );
});

export default router;