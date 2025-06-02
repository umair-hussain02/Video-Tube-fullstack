import { Router } from "express";
import {
    checkSubscriptionStatus,
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subcription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/c/:channelId").post(toggleSubscription);

router.route("/u/:channelId").get(getUserChannelSubscribers);
router.route("/c/:userName").get(getSubscribedChannels);
router.get("/status/:channelId", checkSubscriptionStatus);

export default router;
