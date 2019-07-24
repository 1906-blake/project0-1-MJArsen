import User from '../models/user';
import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../util/user.converter';

let users: User[] = [

];

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

export async function save(user?: User) {
    users.push(user);
}

export async function patch(user: Partial<User>) {
    users = users.map(ele => {
        if (user.userId === ele.userId) {
            return {
                ...ele,
                ...user
            };
        } else {
            return ele;
        }
    });
}
