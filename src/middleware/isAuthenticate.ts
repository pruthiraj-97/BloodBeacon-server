import jwt from 'jsonwebtoken';
export function isAuthenticate(request:any,res:any,next:any){
    try {
        const token = request.headers['x-access-token'];
        console.log(token)
        if(!token||typeof token !== 'string'){
            return res.status(401).json({
                success:false,
                message:"Token not found"
            })
        }
        const payload =jwt.verify(token,'bloodbank')
        if(!payload){
            return res.status(401).json({
                success:false,
                message:"Invalid token , user is auothorized"
            })
        }
        console.log(payload)
        return payload
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error; 
    }
}