import { Router } from "express";
import { sendNotification } from "../controllers/notification";
import { isAuthenticate } from "../middleware/isAuthenticate";
const router=Router()
router.post('/sendnotification',isAuthenticate,sendNotification)
export default router