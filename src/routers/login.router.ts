import express from 'express';
import * as usersDao from '../daos/users.dao'

export const loginRouter = express.Router();

loginRouter.post('', (req, res) => {
    const user = req.body;
    if (user.length === 0) {
        return res.status(400).send({
            error: "Invalid Credentials"
        });
    }
    usersDao.save(user);

    res.status(201); // created status code
    res.json(user);
});