import express from 'express';
import * as userDao from '../daos/users.dao';

// the user router represents a subset of the application
// for all enpoints starting with /users
export const usersRouter = express.Router();

/**
 * /users
 * find all users
 * Allowed roles: finance-manager (to be implamented later)
 */

usersRouter.get('', [
    //authMiddleware('admin', 'manager'),
    async (req, res) => {
        const users = await userDao.findAll();
        res.json(users);
    }]);


/**
 * /users/:id
 * find user by id
 * Allowed roles: finance-managers, or if the id provided matches the id of the current user
 */
usersRouter.get('/:id', (req, res) => {
    const user = userDao.findByUserid(+req.params.id);
    res.json(user);
});

/**
 * /users
 * partially update user resource
 * Allowed roles: admin
 */
usersRouter.patch('', (req, res) => {
    const user = userDao.findByUserid(+req.params.id);
    userDao.patch(req.body);
    res.json(user);
});
