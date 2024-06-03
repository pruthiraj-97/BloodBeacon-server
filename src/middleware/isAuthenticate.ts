import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
export async function isAuthenticate(request:Request,res:Response,next:NextFunction){
    try {
        const token = request.headers['x-access-token'];
        console.log(token)
        if(!token||typeof token != 'string'){
            return res.status(401).json({
                status:401,
                success:false,
                message:"Token not found"
            })
        }
        console.log("token is ",process.env.JWT_SECRET)
        const payload=jwt.verify(token,process.env.JWT_SECRET!||'bloodbank')
        console.log("payload is ",payload)
        if(!payload){
            return res.status(401).json({
                status:401,
                success:false,
                message:"Invalid token , user is auothorized"
            })
        }
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
              status: 401,
              success: false,
              message: "Token expired",
            });
          } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
              status: 401,
              success: false,
              message: "Invalid token",
            });
          } else {
            return res.status(500).json({
              status: 500,
              success: false,
              message: "Internal server error: "
            });
          }
        }
}