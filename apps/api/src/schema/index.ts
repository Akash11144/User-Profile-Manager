export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String
  }

  type Repo {
    id: ID!
    name: String!
    htmlUrl: String!
    description: String
    stargazersCount: Int!
    language: String
    updatedAt: String!
  }

  type Query {
    me: User
    githubRepos(username: String!, sortBy: String, direction: String, page: Int = 1, perPage: Int = 10): [Repo!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(email: String!): AuthPayload!
    updateProfile(name: String!): User!
  }
`;
