import { Pool } from 'pg';

const connectionConfiguration = {
    user: process.env.CARD_DB_USERNAME,
    host: 'localhost', // process.env.CARD_DB_URL ||
    database: process.env.CARD_DB_NAME || 'card_api',
    password: process.env.CARD_DB_PASSWORD,
    port: 5432, // +process.env.CARD_DB_PORT ||
    max: 5
};

// console.log(connectionConfiguration);
export const connectionPool = new Pool(connectionConfiguration);