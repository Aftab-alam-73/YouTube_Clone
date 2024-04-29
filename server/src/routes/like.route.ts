import express from "express";
import { like } from "../controllers/like.controller";
import { verifyToken } from "../middleware/tokenValidation";

const router = express.Router();

router.post("/", verifyToken, like.AddLike);
router.delete("/", verifyToken, like.RemoveLike);
router.get("/:videoId", like.Getlikes);

export default router;
