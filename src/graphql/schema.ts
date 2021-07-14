const { gql } = require("apollo-server-express");

export const typeDefs = gql`
    type Query {
        currentNumber: Int
    }

    type Subscription {
        numberIncremented: Int
    }
`;
