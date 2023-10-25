import express from 'express';
import { googlesigning, setProfile, signin, signout, signup } from '../controllers/auth.js';


const router=express.Router();


router.post('/signin',signin)
router.post('/signup',signup)
router.post('/googlesignin',googlesigning)
router.post('/logout',signout)
router.put('/setprofile',setProfile)
export default router;