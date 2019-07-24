import Reimbursements from '../models/reimbursement';
import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlReim } from '../util/reimbursement.converter';

let reimbursements = [];

export async function findByStatusId(statusId: number) {
    console.log('finding reimbursement by status_id: ' + statusId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM reimbursement WHERE status = $1', [statusId]);
        const sqlReim = result.rows[0];
        return sqlReim && convertSqlReim(sqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByAuthorId(userId: number) {
    console.log('finding reimbursement by author: ' + userId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM reimbursement WHERE author = $1', [userId]);
        const sqlReim = result.rows[0];
        return sqlReim && convertSqlReim(sqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export function save(reimbursement?: Reimbursements) {
    reimbursements.push(reimbursement);
}

export function patch(reimbursement: Partial<Reimbursements>) {
    reimbursements = reimbursements.map(ele => {
        if (reimbursement.reimbursementId === ele.id) {
            return {
                ...ele,
                ...reimbursement
            };
        } else {
            return ele;
        }
    });
}
