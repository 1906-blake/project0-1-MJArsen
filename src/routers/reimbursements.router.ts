import express from 'express';
import * as reimbursementsDao from '../daos/reimbursements.dao';


export const reimbursementsRouter = express.Router();

reimbursementsRouter.get('/status/:statusId',
    async (req, res) => {
        const reim = await reimbursementsDao.findByStatusId(+req.params.statusId);
        res.json(reim);
    });

reimbursementsRouter.get('/author/:userId',
    async (req, res) => {
        const reimbursements = await reimbursementsDao.findByAuthorId(req.params.userId);
        res.json(reimbursements);
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
    const reimbursement = reimbursementsDao.findByAuthorId(req.params.userId);
    reimbursementsDao.patch(req.body);
    res.send(reimbursement);
});
