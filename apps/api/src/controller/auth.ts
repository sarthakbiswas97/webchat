
import { RequestHandler } from 'express';
import prisma from "@repo/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '12345';


interface SignupRequest {
    username: string;
    password: string;
}

interface JwtPayload {
    userId: string;
    username: string;
}


export const signup: RequestHandler<{}, any, SignupRequest> = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            res.status(400).json({
                message: "Username already exists"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        const payload: JwtPayload = {
            userId: user.id, username: user.username
        }


        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' }
        );


        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({
            message: "User created successfully",
            user: userWithoutPassword,
            token
        });
        return;

    } catch (error) {
        res.status(400).json({ error });
        return;
    }
};


export const signin: RequestHandler<{}, any, SignupRequest> = async (req, res) => {
    try {
        const { username, password } = req.body;


        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({
                message: "Invalid credentials"
            });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: _, ...userWithoutPassword } = user;
        
        res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword,
            token
        });
        return;

    } catch (error) {
        res.status(400).json({ error });
        return;
    }
};
