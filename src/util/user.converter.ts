import User from '../models/user';

export function convertSqlUser(row: any) {
    return new User(row.employee_id, row.username, '', row.email, row.first_name, row.last_name, row.roles);
}
