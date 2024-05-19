import { Router } from "express";
import { serchNearbyBloodBank } from "../controllers/searchForBloodBank";
const router=Router()
router.get('/searchbloodbank',serchNearbyBloodBank)
export default router