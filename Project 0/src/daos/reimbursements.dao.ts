import Reimbursements from '../models/reimbursement';
import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlReim } from '../util/reimbursement.converter';

export async function getStatus() {
    console.log('Grabbing all Status');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM reimbursement_status`);
         console.log('result: ' + result);
         console.log('result.rows: ' + result.rows);
        return result.rows;
        // returning an array of reim status
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function getTypes() {
    console.log('Grabbing all reim Types');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM reimbursement_type`);
         console.log('result: ' + result);
         console.log('result.rows: ' + result.rows);
        return result.rows;
        // returning an array of reim status
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findAll() {
    console.log('Finding all Reimbursements');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT r.*, rs.status_id, rs.status, rt.type_id, rt.reimbursement_type, r.reim_type,
        author.username as author_username,
        author.pass as author_password,
        author.first_name as author_first_name,
        author.last_name as author_last_name,
        author.email as author_email,
        author.role_id as author_roleId,
        ar.role as author_role,
        resolver.username as resolver_username,
        resolver.pass as resolver_password,
        resolver.first_name as resolver_first_name,
        resolver.last_name as resolver_last_name,
        resolver.email as resolver_email,
        resolver.role_id as resolver_roleId,
        rr.role as resolver_role
        FROM reimbursement r
            LEFT JOIN reimbursement_status rs ON (r.status = rs.status_id)
            LEFT JOIN reimbursement_type rt ON (r.reim_type = rt.type_id)
            LEFT JOIN employee author ON (author = author.employee_id)
            LEFT JOIN roles ar ON (author.role_id = ar.role_id)
            LEFT JOIN employee resolver ON (resolver = resolver.employee_id)
            LEFT JOIN roles rr ON (resolver.role_id = rr.role_id)`);
        const sqlReim = result.rows.map(convertSqlReim);
        if (sqlReim) {
            console.log('found some records');
        }
        return sqlReim;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}


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
        const result = await client.query(`
        SELECT r.*, rs.status_id,
		rs.status,
		rt.type_id,
		rt.reimbursement_type,
		r.reim_type,
        author.username as author_username,
        author.pass as author_password,
        author.first_name as author_first_name,
        author.last_name as author_last_name,
        author.email as author_email,
        author.role_id as author_roleId,
        ar.role as author_role,
        resolver.username as resolver_username,
        resolver.pass as resolver_password,
        resolver.first_name as resolver_first_name,
        resolver.last_name as resolver_last_name,
        resolver.email as resolver_email,
        resolver.role_id as resolver_roleId,
        rr.role as resolver_role
	FROM reimbursement r
        LEFT JOIN reimbursement_status rs ON (r.status = rs.status_id)
        LEFT JOIN reimbursement_type rt ON (r.reim_type = rt.type_id)
        LEFT JOIN employee author ON (author = author.employee_id)
        LEFT JOIN roles ar ON (author.role_id = ar.role_id)
        LEFT JOIN employee resolver ON (resolver = resolver.employee_id)
        LEFT JOIN roles rr ON (resolver.role_id = rr.role_id)
    WHERE r.status= $1`
            , [statusId]);
        const sqlReim = result.rows.map(convertSqlReim);
        console.log('found some reimbursements');
        return sqlReim;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByAuthorId(authId: number) {
    console.log('finding reimbursement by author: ' + authId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`
    SELECT r.*,
        rs.status_id,
		rs.status,
		rt.type_id,
		rt.reimbursement_type,
		r.reim_type,
        author.username as author_username,
        author.pass as author_password,
        author.first_name as author_first_name,
        author.last_name as author_last_name,
        author.email as author_email,
        author.role_id as author_roleId,
        ar.role as author_role,
        resolver.username as resolver_username,
        resolver.pass as resolver_password,
        resolver.first_name as resolver_first_name,
        resolver.last_name as resolver_last_name,
        resolver.email as resolver_email,
        resolver.role_id as resolver_roleId,
        rr.role as resolver_role
	FROM reimbursement r
        LEFT JOIN reimbursement_status rs ON (r.status = rs.status_id)
        LEFT JOIN reimbursement_type rt ON (r.reim_type = rt.type_id)
        LEFT JOIN employee author ON (author = author.employee_id)
        LEFT JOIN roles ar ON (author.role_id = ar.role_id)
        LEFT JOIN employee resolver ON (resolver = resolver.employee_id)
        LEFT JOIN roles rr ON (resolver.role_id = rr.role_id)
    WHERE author.employee_id = $1`
            , [authId]);
        const sqlReim = result.rows.map(convertSqlReim);

        // sqlReim.forEach(function(element) {
        //     console.log(element);
        // });
        return sqlReim; // && convertSqlReim(sqlReim);
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
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
                INSERT INTO reimbursement (author, amount, date_submitted, description, resolver, status, reim_type)
                VALUES 	($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6)
                RETURNING reimbursement_id
            `;
        const params = [reimbursement.author.userId, reimbursement.amount, reimbursement.description, 1, 1, reimbursement.type.typeId];
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

    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            UPDATE reimbursement
            SET date_resolved = CURRENT_TIMESTAMP,
                status = $1
            WHERE reimbursement_id = $2`;
        const params = [reim.status.statusId, reim.reimbursementId];
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
 * @param reimbursement Reimbursements JSON
 * (Working)
 */
export async function submitReim(reimbursement: Reimbursements) {
    console.log('submitting reimbursement: ' + reimbursement.reimbursementId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO reimbursement (author = $1, amount = $2, date_submitted = CURRENT_TIME, description = $3, resolver = 1, status = 1, reim_type = $4)
            RETURNING reimbursement_id
        `;
        const params = [reimbursement.author, reimbursement.amount, reimbursement.description, reimbursement.type];
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

/**
 * Used to get the current date to be input into Reim Updates
 */
// function getToday() {

//     const today = new Date();
//     const dd = String(today.getDate()).padStart(2, '0');
//     const mm = String(today.getMonth() + 1).padStart(2, '0');
//     const yyyy = today.getFullYear();

//     const newToday = yyyy + '/' + mm + '/' + dd;

//     return newToday;
// }
