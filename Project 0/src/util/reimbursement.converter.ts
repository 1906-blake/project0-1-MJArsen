import Reimbursement from '../models/reimbursement';
import ReimStatus from '../models/reimbursement.status';
import ReimType from '../models/reimbursement.type';
import User from '../models/user';
import Role from '../models/role';

export function convertSqlReim(row: any): Reimbursement {
    return new Reimbursement( row.reimbursement_id,
        new User( row.author_id, row.author_username, '', row.author_first_name, row.author_last_name, row.author_email,
            new Role( row.author_role_id, row.author_role)),
            row.amount,
            row.date_submitted,
            row.date_resolved,
            row.description,
        new User( row.resolver, row.resolver_username, '', row.resolver_first_name, row.resolver_last_name, row.resolver_email,
            new Role( row.resolver_role_id, row.resolver_role)),
        new ReimStatus( row.status_id, row.status),
        new ReimType( row.type_id, row.reimbursement_type));
}
