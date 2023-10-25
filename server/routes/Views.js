import express from 'express';
import { addview, getview } from '../controllers/views.js';
import { verifyToken } from '../jwt.js';

const router=express.Router();

router.post('/addview',verifyToken,addview)
router.get('/getview/:id',getview)

export default router;