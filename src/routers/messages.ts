import { Router } from "express";
const router=Router()
import { sendMessage ,getMessage } from "../controllers/messages";
router.post('/sendmessage/:id',sendMessage)
router.get('/getconversation',getMessage)
export default router