import { sequelize } from '../sequelize'

export const createTables = async () => {
    await sequelize.sync()
}
