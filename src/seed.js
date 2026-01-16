import { User } from "./models/User.js";
import { Post } from "./models/Post.js";
import { Comment } from "./models/Comment.js";

export const seedDatabase = async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    const users = [];

    for (let i = 1; i <= 10; i++) {
        const user = await User.create({
            username: `user${i}`,
            followers: [],
            following: [],
        });
        users.push(user);
    }

    for (const user of users) {
        const others = users.filter(u => u._id.toString() !== user._id.toString());

        const followCount = Math.floor(Math.random() * 3) + 2;
        const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, followCount);

        user.following = shuffled.map(u => u._id);
        await user.save();

        for (const followed of shuffled) {
            followed.followers.push(user._id);
            await followed.save();
        }
    }

    const posts = [];

    for (const user of users) {
        const postCount = Math.floor(Math.random() * 3) + 2;

        for (let i = 1; i <= postCount; i++) {
            const post = await Post.create({
                content: `Post ${i} de ${user.username}`,
                author: user._id,
                likes: [],
            });
            posts.push(post);
        }
    }

    for (const post of posts) {
        const likeCount = Math.floor(Math.random() * 5);
        const shuffledUsers = users.sort(() => 0.5 - Math.random()).slice(0, likeCount);

        post.likes = shuffledUsers.map(u => u._id);
        await post.save();
    }

    for (const post of posts) {
        const commentCount = Math.floor(Math.random() * 3);

        for (let i = 1; i <= commentCount; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            await Comment.create({
                content: `Commentaire ${i} sur ${post.content}`,
                author: randomUser._id,
                post: post._id,
            });
        }
    }

    console.log(" Database seeded with fake data");
};
