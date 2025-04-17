import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();


router.post("/userinfo", async (req: any, res: any) => {
    const token = req.body.token;
    if (!token) {
        return res.status(400).json({ message: '토큰이 없습니다' });
    }
    const user = await prisma.user.findFirst({
        where: {
            token: token
        }
    });
    if (!user) {
        return res.status(400).json({ message: '유저를 찾을 수 없습니다' });
    }
    const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        bio: user.bio,
    }
    const createdArticles = await prisma.post.findMany({
        where: {
            authorId: user.id
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
        }
    });
    res.status(200).json({
        message: '유저 정보',
        userInfo: userInfo,
        createdArticles: createdArticles,
    });
    // console.log(userInfo);
    // console.log(createdArticles);
    return res;
});

router.post('/updateuserinfo', (req:any, res:any) => {
  const { token, name, email, bio } = req.body;
    if(!token || !name || !email || !bio) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요' });
    }

  prisma.user.update({
    where: { token: token },
    data: {
      name,
      email,
      bio,
    },
  }).then(() => {
    res.status(200).json({ message: '업데이트 성공' });
  }).catch(() => {
    res.status(500).json({ message: '업데이트 실패' });
  });
});

export default router;