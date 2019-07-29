import Reimbursement from '../models/reimbursement';
import User from '../models/user';
import Role from '../models/role';
import ReimStatus from '../models/reimbursement.status';
import ReimType from '../models/reimbursement.type';

export function convertSqlReim(row: any) {
    return new Reimbursement(
        row.reimbursement_id,
        new User( row.employee_id, row.username, '', row.first_name, row.last_name, row.email,
            new Role( row.role_id, row.role)),
            row.amount,
            row.date_submitted,
            row.date_resolved,
            row.description,
        new User( row.employee_id, row.username, '', row.first_name, row.last_name, row.email,
            new Role( row.role_id, row.role)),
        new ReimStatus( row.status_id, row.status),
        new ReimType( row.type_id, row.reimbursement_type));
}
