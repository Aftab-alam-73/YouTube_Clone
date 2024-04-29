import express from "express";
import { view } from "../controllers/views.controller";
import { verifyToken } from "../middleware/tokenValidation";

const router = express.Router();

router.post("/", verifyToken, view.Addview);
router.get("/:videoId", view.Getview);

export default router;
