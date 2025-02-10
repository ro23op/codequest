import UserLogin from "../models/login.js";
import nodemailer from "nodemailer";
import useragent from "useragent";
import users from "../models/auth.js";

// Get Client IP
const getClientIP = (req) => req.headers["x-forwarded-for"] || req.socket.remoteAddress;

// Send OTP via Email
const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP for Login",
        text: `Your OTP is ${otp}`,
    });
};

// **Login Route (Send OTP)**
export const SendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const ip = getClientIP(req);
        const agent = useragent.parse(req.headers["user-agent"]);
        const browser = agent.family.toLowerCase();
        const os = agent.os.family;
        const deviceType = agent.device.family.toLowerCase().includes("mobile") ? "Mobile" : "Desktop";
        const loginTime = new Date();
        const hours = loginTime.getHours();

        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = user._id; // Get userId from the user document

        // Restrict Mobile Login to 10 AM - 1 PM
        if (deviceType === "Mobile" && (hours < 10 || hours >= 13)) {
            return res.status(403).json({ message: "Mobile login allowed only between 10 AM - 1 PM" });
        }

        // OTP for Chrome
        if (browser.includes("chrome")) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            // console.log("Generated OTP:", otp);

            // Store OTP in database with expiry
            user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        await user.save();
        console.log(user.otp)

            await sendOTP(email, otp);
            return res.json({ message: "OTP sent to email. Please verify." });
        }

        // Direct Login for Edge
        if (browser.includes("edge")) {
            await UserLogin.create({
                userId,
                ipAddress: ip,
                browser,
                os,
                deviceType,
                status: "Success",
                loginTime,
            });
            return res.json({ message: "Login Successful" });
        }

        return res.status(400).json({ message: "Invalid login attempt." });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// **OTP Verification**
export const verifyotp = async (req, res) => {
    try {
        // console.log("Received Body:", req.body); // Check frontend data

        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        // Fetch user OTP from the database
        const user = await users.findOne({ email });
        // console.log(user.otp)
        if (!user || !user.otp || user.otpExpires < Date.now()) {
            return res.status(401).json({ message: "Invalid or expired OTP" });
        }

        if (otp == user.otp) { 
            console.log("✅ OTP Matched!");

            // Clear OTP after successful verification
            await users.updateOne({ email }, { $unset: { otp: 1, otpExpires: 1 } });

            return res.json({ success: true, message: "Login Successful" });
        }

        console.log("❌ OTP Mismatch!");
        return res.status(401).json({ success: false, message: "Invalid OTP" });

    } catch (error) {
        console.error("OTP Verification Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// Fetch Login History
export const loginhistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const history = await UserLogin.find({ userId }).sort({ loginTime: -1 });
        res.json(history);
    } catch (error) {
        console.error("Fetching History Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
