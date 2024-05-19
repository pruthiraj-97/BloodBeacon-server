import { Router } from "express";
import { registerBloodBank,getBloodBank,setBloodGroups } from "../controllers/BloodBank";
const router=Router()
router.get('/getbloodbank/:id',getBloodBank)
router.post('/registerbloodbank',registerBloodBank)
router.put('/updatebloodgroup/:id',setBloodGroups)
export default router