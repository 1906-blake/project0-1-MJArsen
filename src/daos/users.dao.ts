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
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query('SELECT * FROM app_user');
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

export function findByUserid(userId: number) {
    return users.filter(user => user.userId === userId)[0];
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
