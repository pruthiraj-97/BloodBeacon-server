import { Router } from "express";
const router=Router()
import { sendMessage ,getMessage } from "../controllers/messages";
import { isAuthenticate } from "../middleware/isAuthenticate";
router.post('/sendmessage/:id',isAuthenticate,sendMessage)
router.get('/getconversation',isAuthenticate,getMessage)
export default router