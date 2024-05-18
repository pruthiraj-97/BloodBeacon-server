import { Request } from "express";
import jwt from 'jsonwebtoken';

export async function fetchUserDetails(req: Request) {
    try {
        const token = req.cookies.get("token");
        if (!token) {
            throw new Error("Token not found");
        }
        const user = await jwt.verify(token, process.env.JWT_SECRET!);
        return user;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error; 
    }
}
