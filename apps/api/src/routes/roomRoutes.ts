import { RequestHandler, Router } from "express";
import { createRoom, getRooms, getUserDetails, joinRoom, leaveRoom } from "../controller/room.js";
import { authenticateToken } from "../middleware/authenticate.js";


const router = Router();

router.post("/createroom",authenticateToken,createRoom)
router.post("/joinroom",authenticateToken,joinRoom)
router.post("/leaveroom",authenticateToken,leaveRoom)
router.get("/userdetails",authenticateToken,getUserDetails as unknown as RequestHandler)
router.get("/getrooms",authenticateToken,getRooms as unknown as RequestHandler)

export default router