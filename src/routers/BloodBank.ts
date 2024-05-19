import { Router } from "express";
import { registerBloodBank,getBloodBank,setBloodGroups } from "../controllers/BloodBank";
const router=Router()
router.get('/getbloodbank/:id',getBloodBank)
router.post('/registerbloodbank',registerBloodBank)
router.put('/updatebloodgroup',setBloodGroups)
export default router