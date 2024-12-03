import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "@repo/db";

dotenv.config()
const SECRET_KEY:string = process.env.JWT_SECRET ?? ""

export const authenticateToken = async (req: Request, res: Response, next: Function) => {
    
    try {
        
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.status(403).json({ error: "No authorization header" });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(403).json({ error: "No token provided" });
            return;
        }
        
        try {
            const userInfo = jwt.verify(token, SECRET_KEY) as { userId: string, username: string };

            const userdetails = await prisma.user.findUnique({
                where:{
                    username: userInfo.username
                }
            })

            if(!userdetails){
                res.status(403).json({ error: "User not found" });
                return;
            }

            req.userId = userdetails?.id

            next();
        } catch (error) {
            res.status(403).json({ error: "Invalid token" });
            return;
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};