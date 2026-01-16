import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: String,
    image: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Post = mongoose.model("Post", postSchema);
