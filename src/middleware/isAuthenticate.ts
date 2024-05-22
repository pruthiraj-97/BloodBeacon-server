import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
export function isAuthenticate(request:Request,res:Response,next:NextFunction){
    try {
        const token = request.headers['x-access-token'];
        console.log(token)
        if(!token||typeof token !== 'string'){
            return res.status(401).json({
                status:401,
                success:false,
                message:"Token not found"
            })
        }
        const payload =jwt.verify(token,'bloodbank')
        if(!payload){
            return res.status(401).json({
                status:401,
                success:false,
                message:"Invalid token , user is auothorized"
            })
        }
        console.log(payload)
        next()
    } catch (error) {
        return res.status(500).json({
            status:500,
            success:false,
            message:"Internal server error"
        }) 
    }
}