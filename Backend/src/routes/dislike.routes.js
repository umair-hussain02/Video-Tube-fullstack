import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getDislikedVideos,
    toggleCommentDislike,
    toggleTweetDislike,
    toggleVideoDislike,
} from "../controllers/disLike.controller.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:videoId").post(toggleVideoDislike);
router.route("/toggle/c/:commentId").post(toggleCommentDislike);
router.route("/toggle/t/:tweetId").post(toggleTweetDislike);
router.route("/videos").get(getDislikedVideos);

export default router;
