import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/find/history", async (req: any, res: any) => {
  try {
    const articles = await prisma.post.findMany({
      where: {
        category: '역사'
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        Image: true,
  }
    });
    return res.status(200).json(articles);
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  } 
});
router.get("/find/histrec", async (req: any, res: any) => {
    try {
        const articles = await prisma.post.findMany({
            where: {
                category: '역사',
                recommended: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                Image: true,
            }
        });
        return res.status(200).json(articles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });
    }
});
router.get("/find/art", async (req: any, res: any) => {
  try {
    const articles = await prisma.post.findMany({
      where: {
        category: '예술'
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        Image: true,
  }
    });
    return res.status(200).json(articles);
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  } 
});
router.get("/find/artrec", async (req: any, res: any) => {
    try {
        const articles = await prisma.post.findMany({
            where: {
                category: '예술',
                recommended: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                Image: true,
            }
        });
        return res.status(200).json(articles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });
    }
});
router.get("/find/it", async (req: any, res: any) => {
  try {
    const articles = await prisma.post.findMany({
      where: {
        category: 'IT'
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        Image: true,
  }
    });
    return res.status(200).json(articles);
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  } 
});
router.get("/find/itrec", async (req: any, res: any) => {
    try {
        const articles = await prisma.post.findMany({
            where: {
                category: 'IT',
                recommended: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                Image: true,
            }
        });
        return res.status(200).json(articles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });
    }
});
router.get("/find/economy", async (req: any, res: any) => {
  try {
    const articles = await prisma.post.findMany({
      where: {
        category: '경제'
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        Image: true,
  }
    });
    return res.status(200).json(articles);
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  } 
});
router.get("/find/economyrec", async (req: any, res: any) => {
    try {
        const articles = await prisma.post.findMany({
            where: {
                category: '경제',
                recommended: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                Image: true,
            }
        });
        return res.status(200).json(articles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });
    }
});
router.get("/find/edu", async (req: any, res: any) => {
  try {
    const articles = await prisma.post.findMany({
      where: {
        category: '교육'
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        Image: true,
  }
    });
    return res.status(200).json(articles);
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  } 
});
router.get("/find/edurec", async (req: any, res: any) => {
    try {
        const articles = await prisma.post.findMany({
            where: {
                category: '교육',
                recommended: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                Image: true,
            }
        });
        return res.status(200).json(articles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });
    }
});
router.get("/find/sci", async (req: any, res: any) => {
  try {
    const articles = await prisma.post.findMany({
      where: {
        category: '과학'
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        Image: true,
  }
    });
    return res.status(200).json(articles);
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  } 
});
router.get("/find/scirec", async (req: any, res: any) => {
    try {
        const articles = await prisma.post.findMany({
            where: {
                category: '과학',
                recommended: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                Image: true,
            }
        });
        return res.status(200).json(articles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });
    }
});
router.get("/find/sports", async (req: any, res: any) => {
  try {
    const articles = await prisma.post.findMany({
      where: {
        category: '스포츠'
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        Image: true,
  }
    });
    return res.status(200).json(articles);
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  } 
});
router.get("/find/sportsrec", async (req: any, res: any) => {
    try {
        const articles = await prisma.post.findMany({
            where: {
                category: '스포츠',
                recommended: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                Image: true,
            }
        });
        return res.status(200).json(articles);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });
    }
});

export default router;