import { Router } from "express";
import { login, signUp,VarifyUser } from "../controllers/auth";
const router=Router()
router.post('/signup',signUp)
router.post('/login',login)
router.put('/verify',VarifyUser)
export default router