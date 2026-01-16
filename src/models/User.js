import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const User = mongoose.model("User", userSchema);
