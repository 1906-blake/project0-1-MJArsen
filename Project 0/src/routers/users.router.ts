import express from 'express';
import * as userDao from '../daos/users.dao';
import { authMiddleware } from '../middleware/auth.middleware';

// the user router represents a subset of the application
// for all enpoints starting with /users
export const usersRouter = express.Router();

/**
 * /users
 * find all users
 * Allowed roles: finance-manager (to be implamented later)
 */

usersRouter.get('', [
    authMiddleware('admin', 'manager', 'The Coon'),
    async (req, res) => {
        const users = await userDao.findAll();
        res.json(users);
    }]);


/**
 * /users/:id
 * find user by id
 * Allowed roles: finance-managers, or if the id provided matches the id of the current user
 */
usersRouter.get('/:id',
    async (req, res) => {
        const user = await userDao.findByUserid(+req.params.id);
        res.json(user);
    });

/**
 * /users
 * partially update user resource(s)
 * Allowed roles: admin
 */
usersRouter.patch('', async (req, res) => {
    const result  = req.body;
    console.log('patch result= ' + result + ' req.body = ' + req.body);
    const user = await userDao.updateUser(result);
    res.json(user);
    // } else {
        // res.sendStatus(403);
    // }
});
