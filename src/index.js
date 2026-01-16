import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { connectDB } from "./database.js";
import { seedDatabase } from "./seed.js";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();
await seedDatabase();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

app.use(
    "/graphql",
    expressMiddleware(server)
);

app.listen(4000, () => {
    console.log("GraphQL server at http://localhost:4000/graphql");
});
