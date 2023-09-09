import express from 'express';
import {signup, login, logout,isLoggedIn,findUser} from '../controllers/authController.js'


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/isLoggedIn", isLoggedIn);
router.get("/findUser/:userId", findUser);

// router.post("/forgotPassword",forgotPassword);
// updateuser

export default router;
