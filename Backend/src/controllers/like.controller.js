import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/likes.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const existingLike = await Like.findOne({
        likedBy: req.user._id,
        video: videoId,
    });

    let liked = true;

    if (existingLike) {
        await existingLike.deleteOne();
        liked = false;
    } else {
        await Like.create({
            likedBy: req.user._id,
            video: videoId,
        });
    }

    // Like count calculation
    const likeCount = await Like.countDocuments({ video: videoId });

    return res.status(liked ? 201 : 200).json(
        new ApiResponse(
            liked ? 201 : 200,
            {
                videoId,
                liked,
                likeCount,
            },
            liked ? "Video liked successfully" : "Video unliked successfully"
        )
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const existingLike = await Like.findOne({
        likedBy: req.user._id,
        Comment: commentId,
    });

    let liked = true;

    if (existingLike) {
        await existingLike.deleteOne();
        liked = false;
    } else {
        await Like.create({
            likedBy: req.user._id,
            Comment: commentId,
        });
    }

    // Like count calculation
    const likeCount = await Like.countDocuments({ Comment: commentId });

    return res.status(liked ? 201 : 200).json(
        new ApiResponse(
            liked ? 201 : 200,
            {
                commentId,
                liked,
                likeCount,
            },
            liked
                ? "Comment liked successfully"
                : "Comment unliked successfully"
        )
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const existingLike = await Like.findOne({
        likedBy: req.user._id,
        tweet: tweetId,
    });

    let liked = true;

    if (existingLike) {
        await existingLike.deleteOne();
        liked = false;
    } else {
        await Like.create({
            likedBy: req.user._id,
            tweet: tweetId,
        });
    }

    // Like count calculation
    const likeCount = await Like.countDocuments({ tweet: tweetId });

    return res.status(liked ? 201 : 200).json(
        new ApiResponse(
            liked ? 201 : 200,
            {
                tweetId,
                liked,
                likeCount,
            },
            liked ? "Tweet liked successfully" : "Tweet unliked successfully"
        )
    );
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const likes = await Like.find({
        likedBy: req.user._id,
        video: { $exists: true },
    })
        .populate("video", "title thumbnail likedBy createdAt") // assuming video model has these fields
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

    const total = await Like.countDocuments({
        likedBy: req.user._id,
        video: { $exists: true },
    });

    const likedVideos = likes.map((like) => like.video);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                likedVideos,
                total,
                page: Number(page),
                limit: Number(limit),
            },
            "Liked videos fetched successfully"
        )
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
