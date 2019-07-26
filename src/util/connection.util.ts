import { Pool } from 'pg';

const connectionConfiguration = {
    user: process.env.PRO_0_USERNAME,
    host: process.env.PRO_0_HOST || 'localhost',
    database: process.env.PRO_0_DBNAME || 'project_zero',
    password: process.env.PRO_0_PASSWORD,
    port: 5432,
    max: 5
};

console.log(connectionConfiguration);
export const connectionPool = new Pool(connectionConfiguration);