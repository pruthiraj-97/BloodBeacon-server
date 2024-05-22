import { Router } from "express";
import { isAuthenticate } from "../middleware/isAuthenticate";
import { registerBloodBank,getBloodBank,setBloodGroups } from "../controllers/BloodBank";
const router=Router()
router.get('/getbloodbank',isAuthenticate,getBloodBank)
router.post('/registerbloodbank',isAuthenticate,registerBloodBank)
router.put('/updatebloodgroup/:id',isAuthenticate,setBloodGroups)
export default router