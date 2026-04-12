import express from 'express';
import { signup, signin, googleSignin, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router  = express.Router();

router.post('/signup', signup)
router.post('/signin', signin) 
router.post('/google', googleSignin)
router.get('/logout', logout)

router.put("/update-profile", protectRoute, updateProfile)
router.get("/check-auth", protectRoute, checkAuth)
export default router;
