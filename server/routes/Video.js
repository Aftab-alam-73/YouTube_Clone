import express from 'express';
import { addvideo, getvideo, getvideos ,deletevideo,getSpecificChannelVideos, getSuggestionvideos, subscriptionvideos} from '../controllers/video.js';
import {verifyToken} from '../jwt.js'
const router=express.Router();


router.post('/addvideo',addvideo)
router.get('/getvideos',getvideos)
router.get('/getsuggestonvideos/:VID',getSuggestionvideos)
router.get('/getvideo/:id',getvideo)
router.get('/getchannelvideos/:id',getSpecificChannelVideos)
router.get('/getsubscriptionvideos/',verifyToken,subscriptionvideos)
router.delete('/deletevideo/:id',deletevideo)


export default router;