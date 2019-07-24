import Reimbursement from '../models/reimbursement';

export function convertSqlReim(row: any) {
    return new Reimbursement(row.reimbursement_id, row.author, row.amount, row.date_submitted, row.date_resolved, row.description, row.resolver, row.status, row.type);
}
