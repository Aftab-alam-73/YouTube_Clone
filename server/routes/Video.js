import express from 'express';
import { addvideo, getAllVideos ,deletevideo,getSpecificChannelVideos, getSuggestionvideos, subscriptionvideos, getSingleVideo} from '../controllers/video.js';
import {verifyToken} from '../jwt.js'
const router=express.Router();


router.post('/addvideo',addvideo)
router.get('/getvideos',getAllVideos)
router.get('/getsuggestonvideos/:VID',getSuggestionvideos)
router.get('/getvideo/:id',getSingleVideo)
router.get('/getchannelvideos/:id',getSpecificChannelVideos)
router.get('/getsubscriptionvideos/',verifyToken,subscriptionvideos)
router.delete('/deletevideo/:id',deletevideo)


export default router;