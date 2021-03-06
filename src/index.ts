import { initialiseDatabase } from '../database/setup/initialise-database'
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import { incrementCreateUser } from './graphql/subscriptions/user-created'

const { createServer } = require('http')
const express = require('express')
const { execute, subscribe } = require('graphql')
const { ApolloServer } = require('apollo-server-express')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema');

(async () => {
    await initialiseDatabase()

    const PORT = 4000
    const app = express()
    const httpServer = createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const server = new ApolloServer({ schema })

    await server.start()

    server.applyMiddleware({ app })

    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath },
    )

    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`,
        )
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`,
        )
    })

    await incrementCreateUser()
})()
