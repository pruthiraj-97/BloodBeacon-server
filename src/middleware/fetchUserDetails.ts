import { Request } from "express";
import jwt from 'jsonwebtoken';

export async function fetchUserDetails(request: Request) {
    try {
        const token = request.headers['x-access-token'];
        console.log(token)
        if(!token||typeof token !== 'string'){
            throw new Error('Invalid token')
        }
        const payload =jwt.verify(token,'bloodbank')
        if(typeof payload === 'string'){
            throw new Error('Invalid token')
        }
        console.log(payload)
        return payload
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error; 
    }
}
