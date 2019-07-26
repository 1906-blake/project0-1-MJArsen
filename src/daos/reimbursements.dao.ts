import Reimbursements from '../models/reimbursement';
import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlReim } from '../util/reimbursement.converter';

// let reimbursements = [];

export async function findByReimId(reimId: number) {
    console.log('finding reimbursement by reimbursement_id: ' + reimId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM reimbursement WHERE reimbursement_id = $1', [reimId]);
        const sqlReim = result.rows[0];
        return sqlReim && convertSqlReim(sqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByStatusId(statusId: number) {
    console.log('finding reimbursement by status_id: ' + statusId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM reimbursement WHERE status = $1', [statusId]);
        const sqlReim = result.rows[0];
        console.log('sqlReim in findByStatusId: ' + sqlReim);
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
        const result = await client.query(`
        SELECT * FROM reimbursement WHERE author = $1`, [userId]);
        const sqlReim = result.rows[0];
        return sqlReim && convertSqlReim(sqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByUserId(authorId: number) {
    console.log('finding reimbursement by authorId: ' + authorId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM reimbursement WHERE employee_id = $1`;
        const result = await client.query(queryString, [authorId]);
        const sqlReim = result.rows;
        return sqlReim && convertSqlReim(sqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function save(reimbursement: Reimbursements) {
    // console.log('reimbursement: ' + reimbursement);
    // console.log('reimbursement.type: ' + reimbursement.type);
    const reimType = '5';
    const dateSub = '2018-10-28';
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
                INSERT INTO reimbursement (author, amount, date_submitted, description, resolver, status, reim_type)
                VALUES 	($1, $2, $3, $4, $5, $6, $7)
                RETURNING reimbursement_id
            `;
        const params = [reimbursement.author, reimbursement.amount, dateSub, reimbursement.description, reimbursement.resolver, reimbursement.status, reimType];
        const result = await client.query(queryString, params);
        return result.rows[0].reimbursement_id;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function patch(reim: Reimbursements) {
    const oldReimbursement = await findByReimId(reim.reimbursementId);
    // console.log(oldReimbursement.dateSubmitted);
    console.log('Inside reim.dao patch function');
    if (!oldReimbursement) {
        console.log('nothing in oldReimbursement');
        return undefined;
    }
    reim = {
        ...oldReimbursement,
        ...reim
    };
    // console.log('reimbursement_type: ' + reim.);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const today = getToday();
        const queryString = `
            UPDATE reimbursement SET author = $1, amount = $2, date_submitted = $3, date_resolved = $4, description = $5, resolver = $6, status = $7
            WHERE reimbursement_id = $8`;
        const params = [reim.author, reim.amount, reim.dateSubmitted, today, reim.description, reim.resolver, reim.status, reim.reimbursementId];
        const result = await client.query(queryString, params);
        return convertSqlReim(result); // returns JS notation instead of SQL notation
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

/**
 * Creates a new Reimbursement Request
 * @param reimbursement Reimbursement JSON
 * (Working)
 */
export async function submitReim(reimbursement: Reimbursements) {
    console.log('submiting reimbursement: ' + reimbursement.reimbursementId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO reimbursement (author, amount, date_submitted, description, resolver, status, reim_type)
            VALUES 	($1, $2, $3, $4, $5, $6, $7)
            RETURNING reimbursement_id
        `;
        const params = [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.description, reimbursement.resolver, reimbursement.status, reimbursement.type];
        const result = await client.query(queryString, params);
        reimbursement.reimbursementId = convertSqlReim(result.rows[0]).reimbursementId;
        return reimbursement;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

function getToday() {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const newToday = yyyy + '/' + mm + '/' + dd;

    return newToday;
}
