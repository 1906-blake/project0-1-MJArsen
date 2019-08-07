import User from '../models/user';
import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../util/user.converter';

// let users: User[] = [];

export async function findAll() {
    console.log('finding all users');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        // create the SQL query to be sent to the DB
        const result = await client.query(`
        SELECT * FROM employee
        LEFT JOIN roles USING (role_id)
        ORDER BY employee.employee_id
        `);
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
        client = await connectionPool.connect();
        const result = await client.query(`
        SELECT * FROM employee
        LEFT JOIN roles USING (role_id)
        WHERE employee_id = $1`
        , [userId]);
        const sqlUser = result.rows[0];
        // if a user is found, convert it to an JS object and return it. Otherwise, return the empty user
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByUsernameAndPassword(username: string, password: string) {
    console.log('inside findByUsernameAndPassword');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT * FROM employee
        JOIN roles USING (role_id)
        WHERE username = $1 AND pass = $2
        `;
        const result = await client.query(queryString, [username, password]);
        const sqlUser = result.rows[0];
        console.log(sqlUser);
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function saveNewUser(user: User) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            INSERT INTO employee (username, pass, first_name, last_name, email, role)
            VALUES 	($1, $2, $3, $4, $5, $6)
            RETURNING employee_id
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

export async function updateUser(user: User) {
    // console.log('updateing: ' + user.userId);
    const oldUser = await findByUserid(+ user.userId);
    const newUser = user;
    console.log('newUser: ' + newUser);
    // console.log('oldUser: ' + oldUser + 'oldUser.role: ' + oldUser.role);
    if (!oldUser) {
        return undefined;
    }
    user = {
        ...oldUser,
        ...newUser
    };
    console.log(user);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            UPDATE employee
            SET  first_name = $1, last_name = $2, email = $3
            WHERE employee_id = $4`;
        const params = [ user.firstName, user.lastName, user.email, user.userId];
        await client.query(queryString, params);
        return convertSqlUser(user); // returns JS notation instead of SQL notation
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}
