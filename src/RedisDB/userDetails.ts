import redisClient from "../utils/redis";
async function isEmailExist(email:string)
 {
    const result=await redisClient.sIsMember(createkeyUserEmail(),email)
    return result
}

function createkeyUserEmail(){
    return 'user:email'
}

function keyEmailPassword(){
    return 'email:password'
}

async function PasswordMatch(email:string,password:string){
   const passKey=keyEmailPassword()+':'+email
   const isPasswordExist=await redisClient.hGet(keyEmailPassword(),passKey)
}

export {createkeyUserEmail,isEmailExist}