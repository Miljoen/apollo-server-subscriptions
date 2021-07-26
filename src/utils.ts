import {client, pool} from "../database/db";
import {PoolClient, QueryConfig, QueryResult} from "pg";

client.connect();

export const createUsersTable = async () => {
    const query = `
        CREATE TABLE users
        (
            id       int primary key,
            name     varchar,
            email    varchar,
            password varchar
        );
    `;

    return executeQuery(query);
}

export const listTables = async () => {
    const query = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name;
    `

    return executeQuery(query);
}

export const createUser = async (
    id: number,
    name: string,
    email: string,
    password: string,
) => {
    const query = {
        text: 'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4) RETURNING *',
        values: [id, name, email, password],
    }

    return executeQuery(query);
}

export const getUsers = async () => {
    const query = `
        SELECT *
        FROM users;
    `;

    return executeQuery(query);
}

export const initialiseDatabase = async () => {
    return listTables().then((tables: Array<object>) => {
        if (tables.length === 0) {
            createUsersTable();
            return;
        }

        const doesUsersTableExist = tables.some((table: object) => Object.values(table).some((name: string) => name === 'users'));
        if (!doesUsersTableExist) {
            createUsersTable();
        }
    });
}

function executeQuery(query: QueryConfig|string): Promise<Array<object>> {
    return pool.connect()
        .then((client: PoolClient) => {
            const result = client.query(query);
            client.release();
            return result;
        })
        .then((result: QueryResult) => {
            return result.rows;
        });
}
