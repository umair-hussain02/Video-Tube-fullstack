import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Toggle subscription status
const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const subscriberId = req.user._id;

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    if (subscriberId.toString() === channelId) {
        throw new ApiError(400, "You cannot subscribe to yourself");
    }

    const channel = await User.findById(channelId);
    if (!channel) {
        throw new ApiError(404, "Channel not found");
    }

    const existingSubscription = await Subscription.findOne({
        channel: channelId,
        subscriber: subscriberId,
    });

    if (existingSubscription) {
        await existingSubscription.deleteOne();
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Unsubscribed successfully"));
    } else {
        await Subscription.create({
            channel: channelId,
            subscriber: subscriberId,
        });
        return res
            .status(201)
            .json(new ApiResponse(201, null, "Subscribed successfully"));
    }
});

// Get subscribers of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    const channel = await User.findById(channelId);
    if (!channel) {
        throw new ApiError(404, "Channel not found");
    }

    const rawSubscribers = await Subscription.find({ channel: channelId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .populate("subscriber", "userName avatar");

    const enrichedSubscribers = await Promise.all(
        rawSubscribers.map(async (sub) => {
            const count = await Subscription.countDocuments({
                channel: sub.subscriber._id,
            });
            return {
                ...sub.toObject(),
                totalSubscribers: count,
            };
        })
    );

    const total = await Subscription.countDocuments({ channel: channelId });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                subscribers: enrichedSubscribers, // ✅ now contains totalSubscribers
                total,
                page: Number(page),
                limit: Number(limit),
            },
            "Subscribers fetched successfully"
        )
    );
});

// Get channels a user has subscribed to
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { userName } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // 1. Find the user (subscriber)
    const subscriber = await User.findOne({ userName });
    if (!subscriber) {
        throw new ApiError(404, "Subscriber not found");
    }

    // 2. Find all subscriptions where this user is the subscriber
    const rawChannels = await Subscription.find({ subscriber: subscriber._id })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .populate("channel", "userName avatar");

    // 3. For each channel, count its subscribers
    const enrichedChannels = await Promise.all(
        rawChannels.map(async (sub) => {
            const count = await Subscription.countDocuments({
                channel: sub.channel._id,
            });
            return {
                ...sub.toObject(),
                totalSubscribers: count,
            };
        })
    );

    // 4. Count total for pagination
    const total = await Subscription.countDocuments({
        subscriber: subscriber._id,
    });

    // 5. Return response
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                channels: enrichedChannels,
                total,
                page: Number(page),
                limit: Number(limit),
            },
            "Subscribed channels fetched successfully"
        )
    );
});

// Check if current user is subscribed to a channel
const checkSubscriptionStatus = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const subscriberId = req.user._id;

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    const subscription = await Subscription.findOne({
        channel: channelId,
        subscriber: subscriberId,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { subscribed: Boolean(subscription) },
                "Subscription status fetched"
            )
        );
});

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
    checkSubscriptionStatus,
};
