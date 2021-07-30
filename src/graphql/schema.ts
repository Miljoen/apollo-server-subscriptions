const { gql } = require('apollo-server-express')

export const typeDefs = gql`
    type Query {
        users: [User!]!
    }

    type Subscription {
        userCreated: User
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
    }
`
