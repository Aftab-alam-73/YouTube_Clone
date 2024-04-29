import express from "express";
import { user } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signin", user.SignIn);
router.post("/signup", user.SignUp);
router.post("/googlesignin", user.GoogleSignIn);
router.post("/logout", user.SignOut);
router.put("/setprofile", user.SetProfile);

export default router;
