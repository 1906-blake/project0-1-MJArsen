import User from '../models/user';
import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../util/user.converter';

// let users: User[] = [

// ];

export async function findAll() {
    console.log('finding all users');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT employee.username, employee.first_name, employee.last_name, employee.email, roles.role FROM employee INNER JOIN roles ON employee.roles = roles.role_id;');
        // convert result from sql object to js object
        return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function findByUserid(userId: number) {
    console.log('finding user by id: ' + userId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query('SELECT employee.username, employee.first_name, employee.last_name, employee.email, roles.role FROM employee INNER JOIN roles ON employee.roles = roles.role_id WHERE employee_id = $1', [userId]);
        const sqlUser = result.rows[0];
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function save(user: User) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO app_user (username, pass, first_name, last_name, email, role)
            VALUES 	($1, $2, $3, $4, $5, $6)
            RETURNING user_id
        `;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.role];
        const result = await client.query(queryString, params);
        return result.rows[0].user_id;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function patch(user: Partial<User>) {
    const oldUser = await findByUserid(user.userId);
    if (!oldUser) {
        return undefined;
    }
    user = {
        ...oldUser,
        ...user
    };
    console.log(user);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            UPDATE app_user SET username = $1, pass = $2, first_name = $3, last_name = $4, email = $5, role = $6
            WHERE user_id = $7
            RETURNING *
        `;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.role, user.userId];
        const result = await client.query(queryString, params);
        const sqlUser = result.rows[0];
        return convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}
