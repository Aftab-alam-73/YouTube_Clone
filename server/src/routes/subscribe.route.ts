import express from "express";
import { subscribe } from "../controllers/subscribe.controller";
import { verifyToken } from "../middleware/tokenValidation";

const router = express.Router();

router.get("/:channelId", subscribe.Getsubscriber);
router.get("/", verifyToken, subscribe.GetSubscribedChannels);
router.post("/", subscribe.Subscribe);
router.delete("/", subscribe.Unsubscribe);

export default router;
