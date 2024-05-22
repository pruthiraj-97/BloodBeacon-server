import { Router } from "express";
import { login, signUp,VarifyUser, getProfile } from "../controllers/auth";
import { isAuthenticate } from "../middleware/isAuthenticate";
const router=Router()
router.post('/signup',signUp)
router.post('/login',login)
router.put('/verify',VarifyUser)
router.get('/profile',isAuthenticate,getProfile)
export default router