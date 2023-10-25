import express from 'express';
import {verifyToken} from '../jwt.js'
import { getSubscribedChannels, getsubscriber, subscribe, unsubscribe } from '../controllers/subscribe.js';

const router=express.Router();

router.get('/getsubscriber/:channelId',getsubscriber)
router.get('/getsubscribedchannels',verifyToken,getSubscribedChannels)
router.post('/subscribe', subscribe)
router.delete('/unsubscribe',unsubscribe)

export default router;