import express from 'express';

import * as reimbursementsDao from '../daos/reimbursements.dao';
import * as usersDao from '../daos/users.dao';

export const reimbursementsRouter = express.Router();

reimbursementsRouter.get('/status/:statusId', (req, res) => {
    const statusId = req.params.statusId;
    const reimbursements = reimbursementsDao.findByStatusId(statusId);
    res.json(reimbursements);
});

reimbursementsRouter.get('/author/userId/:userId/date-submitted?start=:startDate&end=:endDate', (req, res) => {
    const userId = req.params.userId;
    const users = usersDao.findByUserid(userId);
    res.json(users);
});


reimbursementsRouter.post('', (req, res) => {
    const reimbursements = req.body;
    reimbursementsDao.save(reimbursements);

    res.status(201); // created status code
    res.json(reimbursements);
});

/**
 * Allowed role: finance-manager
 */
reimbursementsRouter.patch('', (req, res) => {
    const reimbursement = reimbursementsDao.findByUser(req.params.userId);
    reimbursementsDao.patch(req.body);
    res.send(reimbursement);
});
