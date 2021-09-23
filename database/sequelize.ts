import { DataTypes, Sequelize } from 'sequelize'

export const sequelize = new Sequelize('postgres://yoeritosh:@127.0.0.1:5432/apollo-server-subscriptions')

export const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    freezeTableName: true,
})
