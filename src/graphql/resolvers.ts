import { User } from '../../database/sequelize'

const { PubSub } = require('graphql-subscriptions')

const pubSub = new PubSub()

export const resolvers = {
    Query: {
        users() {
            return getUsers()
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubSub.asyncIterator(['USER_CREATED']),
        },
    },
}

const idGenerator = (function* getIdGenerator() {
    let id = 1
    while (true) yield id++
}())

export const incrementCreateUser = async () => {
    const id = idGenerator.next().value

    pubSub.publish('USER_CREATED', {
        userCreated: await User.create({
            id,
            name: 'Yoeri',
            email: 'yoeri@test.com',
            password: 'password',
        }, {
            fields: [
                'id',
                'name',
                'email',
                'password',
            ],
        }),
    })

    setTimeout(incrementCreateUser, 1000)
}

function getUsers() {
    return User.findAll()
}
