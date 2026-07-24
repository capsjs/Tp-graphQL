# TP GraphQL

TP illustrant la mise en place d'une API **GraphQL** avec **Apollo Server**, **Express** et **MongoDB** (via une base MongoDB en mémoire), autour d'un mini réseau social : utilisateurs, publications (posts), likes et commentaires.

## Stack technique

- [Node.js](https://nodejs.org/) (modules ES — `"type": "module"`)
- [Express](https://expressjs.com/) — serveur HTTP
- [@apollo/server](https://www.apollographql.com/docs/apollo-server/) — serveur GraphQL
- [Mongoose](https://mongoosejs.com/) — ODM MongoDB
- [mongodb-memory-server](https://github.com/typegoose/mongodb-memory-server) — instance MongoDB éphémère en mémoire (aucune installation de MongoDB requise)
- [cors](https://www.npmjs.com/package/cors), [body-parser](https://www.npmjs.com/package/body-parser)

## Structure du projet

```
Tp-graphQL/
├── src/
│   ├── index.js        # Point d'entrée : configure Express + Apollo Server
│   ├── database.js     # Connexion à une base MongoDB en mémoire
│   ├── seed.js         # Génération de données de test (users, posts, comments)
│   ├── schema.js       # Définition du schéma GraphQL (typeDefs)
│   ├── resolvers.js    # Résolveurs GraphQL
│   └── models/
│       ├── User.js     # Modèle Mongoose User
│       ├── Post.js     # Modèle Mongoose Post
│       └── Comment.js  # Modèle Mongoose Comment
├── package.json
└── readme.md
```

## Modèle de données

- **User** : `username`, `followers` (liste d'User), `following` (liste d'User)
- **Post** : `content`, `image` (optionnel), `author` (User), `likes` (liste d'User)
- **Comment** : `content`, `author` (User), `post` (Post)

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```

Au démarrage, le serveur :
1. crée une base MongoDB temporaire en mémoire (`mongodb-memory-server`) ;
2. la peuple avec des données factices (10 utilisateurs, relations de follow aléatoires, posts, likes et commentaires) via `seedDatabase()` ;
3. démarre le serveur GraphQL.

⚠️ La base étant en mémoire, **toutes les données sont réinitialisées à chaque redémarrage** du serveur.

Le serveur est ensuite accessible sur :

```
http://localhost:4000/graphql
```

## Schéma GraphQL

```graphql
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
```

## Exemples de requêtes

Récupérer tous les utilisateurs avec leurs posts et le nombre de followers :

```graphql
query {
  users {
    id
    username
    followers {
      username
    }
    posts {
      content
      likes {
        username
      }
    }
  }
}
```

Récupérer un utilisateur précis avec ses commentaires sur ses posts :

```graphql
query {
  user(id: "ID_UTILISATEUR") {
    username
    posts {
      content
      comments {
        content
        author {
          username
        }
      }
    }
  }
}
```

## Notes

- Toutes les requêtes du schéma (`users`, `user(id)`, `posts`, `post(id)`, `postsLikedByUser(userId)`) sont implémentées dans `resolvers.js`.
- Ce TP est en lecture seule (pas de mutations définies pour créer/modifier des users, posts ou commentaires) ; les données viennent uniquement du script de seed.
- Projet à but pédagogique, sans authentification ni gestion d'erreurs avancée.
