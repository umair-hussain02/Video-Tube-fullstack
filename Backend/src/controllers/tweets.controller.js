import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Like } from "../models/likes.model.js";
import { Dislike } from "../models/dislike.model.js";

const getAllTweets = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        query = "",
        sortBy = "createdAt",
        sortType = "desc",
        userId,
    } = req.query;
    const filter = {};

    if (query) {
        filter.title = { $regex: query, $options: "i" }; // case-insensitive search
    }

    if (userId && isValidObjectId(userId)) {
        filter.owner = userId;
    }

    const sortOption = { [sortBy]: sortType === "asc" ? 1 : -1 };

    const tweets = await Tweet.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .populate("owner", "userName avatar");

    const tweetWithLikes = await Promise.all(
        tweets.map(async (tweet) => {
            const likes = await Like.countDocuments({ tweet: tweet._id });

            return {
                ...tweet.toObject(),
                likes,
            };
        })
    );

    const total = await Tweet.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                tweets: tweetWithLikes,
                total,
                page: Number(page),
                limit: Number(limit),
            },
            "Tweets fetched successfully"
        )
    );
});

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Tweet content cannot be empty");
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user._id,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
    const { userName } = req.params;
    console.log(userName);

    const { page = 1, limit = 10 } = req.query;

    const user = await User.findOne({ userName });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const tweets = await Tweet.find({ owner: user })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .populate("owner", "username avatar");

    const total = await Tweet.countDocuments({ user });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { tweets, total, page: Number(page), limit: Number(limit) },
                "User tweets fetched successfully"
            )
        );
});

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Tweet content cannot be empty");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    if (tweet.owner.toString() !== req.user._id.toString()) {
        // throw new ApiError(403, "You are not authorized to update this tweet");
        // console.log(tweet.owner.toString);
        // console.log(req.user._id.toString());
    }

    tweet.content = content;
    await tweet.save();

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    if (tweet.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this tweet");
    }

    await Like.deleteMany({ tweet: tweetId });
    await Dislike.deleteMany({ tweet: tweetId });

    await tweet.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Tweet deleted successfully"));
});

export { getAllTweets, createTweet, getUserTweets, updateTweet, deleteTweet };
