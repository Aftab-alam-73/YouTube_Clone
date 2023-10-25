import express from 'express';
import { dislike, getlikes, like } from '../controllers/like.js';
import { verifyToken } from '../jwt.js';
const router=express.Router();

router.post("/like",verifyToken,like)
router.delete("/dislike",verifyToken,dislike)
router.get('/getlikes/:id',getlikes)

export default router;