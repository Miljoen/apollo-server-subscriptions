const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

export const resolvers = {
    Query: {
        currentNumber() {
            return currentNumber;
        },
    },
    Subscription: {
        numberIncremented: {
            subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
        },
    },
};

let currentNumber = 0;
function incrementNumber() {
    currentNumber++;
    pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
    setTimeout(incrementNumber, 1000);
}
// Start incrementing
incrementNumber();
