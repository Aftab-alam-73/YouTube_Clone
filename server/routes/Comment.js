import express from 'express';
import { verifyToken } from '../jwt.js';
import { addComment, getComment, removeComment } from '../controllers/comment.js';
const router=express.Router();


router.post('/addcomment',verifyToken,addComment)
router.delete('/removecomment',verifyToken,removeComment)
router.get('/getcomment/:id',getComment)


export default router;