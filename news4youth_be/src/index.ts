import { PrismaClient } from "@prisma/client";
import express from 'express';
const app = express();
const port = 4000
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
import cors from 'cors';
app.use(cors({
  origin: 'http://172.16.1.225:3000',
  credentials: true,
}));
import newsRouter from './routes/newsRouter';
import myAcc from './routes/myAcc';
import search from './routes/search';
import { env } from "process";
app.use(newsRouter);
app.use(myAcc);
app.use(search);

const check = async (username: string, password: string) => {
    // Check if the user exists in the database
    const user = await prisma.user.findFirst({
        where: {
            name: username
        }
    });
    if (!user) {
        return false;
    }
    // Check if the password is correct
    const isPasswordValid = await prisma.user.findFirst({
        where: {
            name: username,
            password: password
        }
    });
    if (!isPasswordValid) {
        return false;
    }
    return true;
}
const isavailable = async (username: string) => {
    // Check if the user exists in the database
    const user = await prisma.user.findFirst({
        where: {
            name: username
        }
    });
    if (user) {
        return false;
    }
    return true;
}
const secretKey: string = process.env.JWT_SECRET_KEY || "jwt-secret-key";
const createToken = (username: string) => {
    const token = jwt.sign({ user_id: username }, secretKey);
    return token;
}


app.post('/signin', (req:any, res:any) => {
    const { username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: '닉네임과 비밀번호를 입력해주세요' });
    }
    prisma.user.findFirst({
        where: {
            name: username
        }
    }).then(user => {
        check(username, password).then(isValid => {
            if (isValid && user) {
                res.status(200).json({ message: '로그인 성공', token: user.token });
            } else {
                res.status(400).json({ message: '올바르지 않은 닉네임 또는 비밀번호입니다' });
            }
        }).catch(error => {
            res.status(500).json({ message: 'Internal server error', error });
        });
    }).catch(error => {
        res.status(500).json({ message: 'Internal server error', error });
    });
})
app.post('/signup', async(req:any, res:any) => {
    const { username, password, email, code } = req.body;
    if(code !== env.CERTIFICATION_CODE) {
        return res.status(400).json({ message: '인증번호가 틀립니다' });
    }
    if (!username || !password || !email) {
        return res.status(400).json({ message: '이메일, 닉네임과 비밀번호를 입력해주세요' });
    }
    if (await !isavailable(username)) {
        return res.status(400).json({ message: '중복된 닉네임 입니다' });
    }
    prisma.user.create({
        data: {
            email: email,
            name: username,
            password: password,
            token: createToken(username),
        }
    }).then(async() => {
        // res.status(201).json({ message: '회원가입 성공' });
        // send token to client
        let data = await prisma.user.findFirst({
            where: {
                name: username
            }
        });
        const token = data?.token || null;
        res.status(200).json({ message: '회원가입 성공', token: token});
    }).catch(error => {
        res.status(500).json({ message: 'Internal server error', error });
    });
})


// news save
app.post('/create/news', async(req:any, res:any) => {
    const { title, content, token, category } = req.body;
    if (!title || !content || !token || !category) {
        return res.status(400).json({ message: '제목, 본문, 또는 로그인되어있지 않습니다' });
    }
    let data = await prisma.user.findFirst({
        where: {
            token: token
        }
    });
    if (!data) return; //여기 문제임
      prisma.post.create({
        data: {
            title: title,
            content: content,
            authorId: data.id,
            category: category,
        }
    }).then((response) => {
      console.log(response);
        res.status(201).json({ message: '뉴스 저장 성공', postId: response.id });
    }).catch(error => {
        res.status(500).json({ message: 'Internal server error', error });
    });
})


app.listen(port, '0.0.0.0', () => {
  console.log(`backend app listening on port ${port}`)
})