import session from 'express-session';

const sessionConfiguration = {
    secret: 'flak',
    cookie: { secure: false },
};

export const sessionMiddleware = session(sessionConfiguration);
