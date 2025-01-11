import { Router } from "express"
import { getStats, getDeviation } from "../controllers/stats.controller.js"

const router = Router()


router.route("/stats/:id").get(getStats) 
router.route("/deviation/:id").get(getDeviation)


export default router