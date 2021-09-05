import { PoolClient, QueryConfig, QueryResult } from 'pg'
import { pool } from '../database/db'
import { DataTypes } from "sequelize";
import { sequelize, User } from "../database/sequelize";

export const createUsersTable = () => {
    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    }, { sequelize, modelName: 'user' })
}

export const listTables = () => {
    const query = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name;
    `

    return executeQuery(query)
}

export const dropUsersTable = () => {
    const query = `
        DROP TABLE users;
    `

    return executeQuery(query)
}

export const createUser = (
    id: number,
    name: string,
    email: string,
    password: string,
) => {
    const query = {
        text: 'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4) RETURNING *',
        values: [id, name, email, password],
    }

    return executeQuery(query)
}

export const getUsers = () => {
    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    }, { sequelize, modelName: 'user' })

    sequelize.sync()

    User.create({
        name: 'janedoe',
        email: 'jane@doe.com',
    })

    return User.findAll()
}

export async function initialiseDatabase(): Promise<void> {
    const tables: Array<object> = await listTables()
    const doesUsersTableExist = tables.some((table: object) => (
        Object.values(table).some((name: string) => name === 'users')
    ))

    if (! doesUsersTableExist) {
        await createUsersTable()
    }
}

async function executeQuery(query: QueryConfig | string): Promise<Array<object>> {
    const client: PoolClient = await pool.connect()
    const result: QueryResult = await client.query(query)
    client.release()
    return result.rows
}
