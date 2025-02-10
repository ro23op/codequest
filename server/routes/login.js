import express from 'express';
import { SendOtp,loginhistory,verifyotp } from '../controller/login.js';

const router = express.Router()

router.post("/send-otp",SendOtp);
router.post("/verify-otp",verifyotp);
router.get("/login-history/:userId",loginhistory);

export default router;