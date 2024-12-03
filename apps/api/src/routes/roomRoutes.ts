import { Router } from "express";
import { createRoom, joinRoom } from "../controller/room.js";
import { authenticateToken } from "../middleware/authenticate.js";


const router = Router();

router.post("/createroom",authenticateToken,createRoom)
router.post("/joinroom",authenticateToken,joinRoom)

export default router