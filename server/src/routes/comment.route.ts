import express from "express";
import { comment } from "../controllers/comment.controller";
import { verifyToken } from "../middleware/tokenValidation";
const router = express.Router();

router.post("/", verifyToken, comment.AddComment);
router.delete("/", verifyToken, comment.RemoveComment);
router.get("/:videoId", comment.GetComments);

export default router;
