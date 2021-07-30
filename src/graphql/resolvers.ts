import { createUser, getUsers } from '../utils'

const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

export const resolvers = {
    Query: {
        users() {
            return getUsers()
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterator(['USER_CREATED']),
        },
    },
}

const idGenerator = (function* getIdGenerator() {
    let id = 1
    while (true) yield id++
}())

export const incrementCreateUser = async () => {
    const id = idGenerator.next().value
    createUser(id, 'Yoeri', 'yoeri@test.com', 'password').then((userArray: Array<object>) => {
        pubsub.publish('USER_CREATED', { userCreated: userArray[0] })
    })

    setTimeout(incrementCreateUser, 1000)
}
