import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Dislike } from "../models/dislike.model.js";

// Toggle video dislike
const toggleVideoDislike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const existingDislike = await Dislike.findOne({
        disLikedBy: req.user._id,
        video: videoId,
    });

    let disliked = true;

    if (existingDislike) {
        await existingDislike.deleteOne();
        disliked = false;
    } else {
        await Dislike.create({
            disLikedBy: req.user._id,
            video: videoId,
        });
    }

    const dislikeCount = await Dislike.countDocuments({ video: videoId });

    return res.status(disliked ? 201 : 200).json(
        new ApiResponse(
            disliked ? 201 : 200,
            {
                videoId,
                disliked,
                dislikeCount,
            },
            disliked
                ? "Video disliked successfully"
                : "Video undisliked successfully"
        )
    );
});

// Toggle comment dislike
const toggleCommentDislike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const existingDislike = await Dislike.findOne({
        disLikedBy: req.user._id,
        Comment: commentId,
    });

    let disliked = true;

    if (existingDislike) {
        await existingDislike.deleteOne();
        disliked = false;
    } else {
        await Dislike.create({
            disLikedBy: req.user._id,
            Comment: commentId,
        });
    }

    const dislikeCount = await Dislike.countDocuments({ Comment: commentId });

    return res.status(disliked ? 201 : 200).json(
        new ApiResponse(
            disliked ? 201 : 200,
            {
                commentId,
                disliked,
                dislikeCount,
            },
            disliked
                ? "Comment disliked successfully"
                : "Comment undisliked successfully"
        )
    );
});

// Toggle tweet dislike
const toggleTweetDislike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const existingDislike = await Dislike.findOne({
        disLikedBy: req.user._id,
        tweet: tweetId,
    });

    let disliked = true;

    if (existingDislike) {
        await existingDislike.deleteOne();
        disliked = false;
    } else {
        await Dislike.create({
            disLikedBy: req.user._id,
            tweet: tweetId,
        });
    }

    const dislikeCount = await Dislike.countDocuments({ tweet: tweetId });

    return res.status(disliked ? 201 : 200).json(
        new ApiResponse(
            disliked ? 201 : 200,
            {
                tweetId,
                disliked,
                dislikeCount,
            },
            disliked
                ? "Tweet disliked successfully"
                : "Tweet undisliked successfully"
        )
    );
});

// Get disliked videos
const getDislikedVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const dislikes = await Dislike.find({
        disLikedBy: req.user._id,
        video: { $exists: true },
    })
        .populate("video", "title thumbnail likedBy createdAt")
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

    const total = await Dislike.countDocuments({
        disLikedBy: req.user._id,
        video: { $exists: true },
    });

    const dislikedVideos = dislikes.map((d) => d.video);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                dislikedVideos,
                total,
                page: Number(page),
                limit: Number(limit),
            },
            "Disliked videos fetched successfully"
        )
    );
});

const getVideoDislikesIds = asyncHandler(async (req, res) => {
    const { vId } = req.params;

    if (!isValidObjectId(vId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const dislikes = await Dislike.find({ video: vId });
    const dislikedVideosids = dislikes.map((d) => d._id);
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                dislikedVideosids,
            },
            "Video Dislike id's fetched successfully"
        )
    );
});

export {
    toggleVideoDislike,
    toggleCommentDislike,
    toggleTweetDislike,
    getDislikedVideos,
};
