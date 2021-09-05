import { Model, Sequelize } from 'sequelize'

export const sequelize = new Sequelize('postgres://yoeritosh:@127.0.0.1:5432/apollo-server-subscriptions')

export class User extends Model {
}
