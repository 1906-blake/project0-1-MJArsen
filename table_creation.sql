
CREATE TABLE roles
(
    role_id SERIAL NOT NULL PRIMARY KEY,
    role text NOT NULL
);

CREATE TABLE reimbursement_status
(
    status_id SERIAL NOT NULL PRIMARY KEY,
    status text NOT NULL

);

CREATE TABLE reimbursement_type
(
    type_id SERIAL NOT NULL PRIMARY KEY,
    reimbursement_type text NOT NULL

);

CREATE TABLE employee
(
    employee_id SERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    pass text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL UNIQUE,
    roles integer NOT NULL REFERENCES roles(role_id)
);

CREATE TABLE reimbursement
(
    reimbursement_id SERIAL PRIMARY KEY,
    author integer NOT NULL REFERENCES employee(employee_id),
    amount integer NOT NULL,
    date_submitted date NOT NULL,
    date_resolved date,
    description text NOT NULL,
    resolver integer NOT NULL REFERENCES employee(employee_id),
    status integer NOT NULL REFERENCES reimbursement_status(status_id),
    reim_type integer NOT NULL REFERENCES reimbursement_type(type_id)
);