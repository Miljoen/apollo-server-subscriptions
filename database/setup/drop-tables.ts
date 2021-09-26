import { sequelize } from '../sequelize'

export const dropTables = async () => {
    await sequelize.drop()
}
