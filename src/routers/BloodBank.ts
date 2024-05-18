import { Router } from "express";
import { registerBloodBank,getBloodBank,setBloodGroups } from "../controllers/BloodBank";
const router=Router()
router.get('/getbloodbank',getBloodBank)
router.post('/registerbloodbank',registerBloodBank)
router.put('/updatebloodgroup',setBloodGroups)
export default router