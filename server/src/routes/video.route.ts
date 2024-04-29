import express from "express";
import { video } from "../controllers/video.controller";
import { verifyToken } from "../middleware/tokenValidation";
const router = express.Router();

router.get("/", video.GetVideos);
router.get("/:id", video.GetVideo);
router.post("/", video.AddVideo);
router.get("/suggestion/:videoId", video.GetSuggestionvideos);
router.get("/channel/:id", video.GetSpecificChannelVideos);
router.get("/subscription/:id", verifyToken, video.GetSubscriptionVideos);
router.delete("/:id", verifyToken, video.DeleteVideo);

export default router;
