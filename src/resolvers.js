import mongoose from "mongoose";
import { User } from "./models/User.js";
import { Post } from "./models/Post.js";
import { Comment } from "./models/Comment.js";

export const resolvers = {
    Query: {
        users: async () => await User.find().exec(),

        user: async (_, { id }) => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
            }
            return await User.findById(id).exec();
        },

        posts: async () => await Post.find().exec(),

        post: async (_, { id }) => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
            }
            return await Post.findById(id).exec();
        },

        postsLikedByUser: async (_, { userId }) => {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return [];
            }
            return await Post.find({ likes: userId }).exec();
        },
    },

    User: {
        id: (parent) => parent._id.toString(),

        followers: async (parent) => {
            if (!parent.followers || parent.followers.length === 0) return [];
            return await User.find({ _id: { $in: parent.followers } }).exec();
        },

        following: async (parent) => {
            if (!parent.following || parent.following.length === 0) return [];
            return await User.find({ _id: { $in: parent.following } }).exec();
        },

        posts: async (parent) =>
            await Post.find({ author: parent._id }).exec(),

        likedPosts: async (parent) =>
            await Post.find({ likes: parent._id }).exec(),
    },

    Post: {
        id: (parent) => parent._id.toString(),

        author: async (parent) =>
            await User.findById(parent.author).exec(),

        likes: async (parent) => {
            if (!parent.likes || parent.likes.length === 0) return [];
            return await User.find({ _id: { $in: parent.likes } }).exec();
        },

        comments: async (parent) =>
            await Comment.find({ post: parent._id }).exec(),
    },

    Comment: {
        id: (parent) => parent._id.toString(),

        author: async (parent) =>
            await User.findById(parent.author).exec(),

        post: async (parent) =>
            await Post.findById(parent.post).exec(),
    },
};
