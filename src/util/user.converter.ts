import User from '../models/user';
import Role from '../models/role';

export function convertSqlUser(row: any) {
    return new User(row.employee_id, row.username, '', row.first_name, row.last_name, row.email,
    new Role( row.role_id, row.role)
    );
}
