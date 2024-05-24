import { Router } from "express";
import { sendNotification,getNotification,removeNotification } from "../controllers/notification";
import { isAuthenticate } from "../middleware/isAuthenticate";
const router=Router()
router.post('/sendnotification',isAuthenticate,sendNotification)
router.get('/getnotification',isAuthenticate,getNotification)
router.delete('/removenotification/:id',isAuthenticate,removeNotification)
export default router