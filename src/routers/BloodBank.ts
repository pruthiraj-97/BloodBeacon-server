import { Router } from "express";
import { isAuthenticate } from "../middleware/isAuthenticate";
import { registerBloodBank,getBloodBank,setBloodGroups,getBloodBankById } from "../controllers/BloodBank";
const router=Router()
router.get('/getbloodbank',isAuthenticate,getBloodBank)
router.post('/registerbloodbank',isAuthenticate,registerBloodBank)
router.put('/updatebloodgroup/:id',isAuthenticate,setBloodGroups)
router.get('/getbloodbank/:id',isAuthenticate,getBloodBankById)
router.put('/updatelocation/:id',isAuthenticate,)
export default router