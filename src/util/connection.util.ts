import { Pool } from 'pg';

const connectionConfiguration = {
    user: 'Postgres',
    host: 'demo-db.chloflhomsu6.us-east-2.rds.amazonaws.com',
    database: 'project_zero',
    password: 'darkwave',
    port: 5432,
    max: 5
};

console.log(connectionConfiguration);
export const connectionPool = new Pool(connectionConfiguration);