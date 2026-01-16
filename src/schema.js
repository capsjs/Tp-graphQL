export const typeDefs = `#graphql
type User {
  id: ID!
  username: String!
  followers: [User!]!
  following: [User!]!
  posts: [Post!]!
  likedPosts: [Post!]!
}

  type Post {
    id: ID!
    content: String!
    image: String
    author: User!
    likes: [User!]!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
  }
  
  type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
  post(id: ID!): Post
  postsLikedByUser(userId: ID!): [Post!]!
}
`;
