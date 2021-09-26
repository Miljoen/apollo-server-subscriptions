import { getUsers } from './queries/get-users'
import { pubSub } from './pub-sub'

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
