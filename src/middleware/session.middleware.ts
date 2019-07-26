import session from 'express-session';

const sessionConfiguration = {
    secret: 'magic',
    cookie: { secure: false },
};

export const sessionMiddleware = session(sessionConfiguration);
