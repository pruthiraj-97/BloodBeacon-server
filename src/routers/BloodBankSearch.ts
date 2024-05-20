import { Router } from "express";
import { serchNearbyBloodBank } from "../controllers/searchForBloodBank";
import { isAuthenticate } from "../middleware/isAuthenticate";
const router=Router()
router.get('/searchbloodbank',isAuthenticate,serchNearbyBloodBank)
export default router