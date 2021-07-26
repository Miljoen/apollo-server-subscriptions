import {createUser, getUsers, initialiseDatabase} from "../utils";

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

export const resolvers = {
    Query: {
        users () {
            return getUsers();
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterator(["USER_CREATED"]),
        },
    },
};

let id = 0;
export const incrementCreateUser = async () => {
    createUser(id, 'Yoeri', 'yoeri@test.com', 'password').then((userArray: Array<object>) => {
        pubsub.publish("USER_CREATED", { userCreated: userArray[0] });
    });

    id++;

    setTimeout(incrementCreateUser, 1000);
}
