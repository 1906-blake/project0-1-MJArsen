import express from 'express';
import * as reimbursementsDao from '../daos/reimbursements.dao';
import { authMiddleware } from '../middleware/auth.middleware';

export const reimbursementsRouter = express.Router();

/*************************************************
 * GET Methods
 *************************************************/

/**
 * Find all Reimbursements
 */
reimbursementsRouter.get('', [
    authMiddleware('The Coon', 'admin', 'finance-manager'),
    async (req, res) => {
        const reim = await reimbursementsDao.findAll();
        res.json(reim);
    }]);
/**
 * Find Reimbursement(s) by status ID
 */
reimbursementsRouter.get('/status/:statusId', [
    // authMiddleware('The Coon', 'admin', 'finance-manager'),
    async (req, res) => {
        const statId = req.params.statusId;
        const reim = await reimbursementsDao.findByStatusId(statId);
        res.json(reim);
    }]);

/**
 * Find Reimbursement(s) by author ID (Employee ID)
 */
reimbursementsRouter.get('/author', [
    // authMiddleware('The Coon', 'admin', ' finance-manager'),

    async (req, res) => {
        if (req.session.user) {
            console.log('req.session.user: ' + req.session.user);
            console.log('req.session.userId: ' + req.session.user.userId);
            const user = req.session.user.userId;
            const foundReim = await reimbursementsDao.findByAuthorId(user);
            console.log('returned reim by author: ' + foundReim);
            res.json(foundReim);
        } else {
            res.status(400);
            res.send('Not logged in');
        }
    }]);

/*************************************************
 * POST Methods
 *************************************************/

/**
 * Create a new Reimbursement Request
 */
reimbursementsRouter.post('', async (req, res) => {
    console.log('In Reim Post');
    const result = await reimbursementsDao.save(req.body);
    res.json(result);
});


/*************************************************
 * PATCH Methods
 *************************************************/
/**
 * Allowed role: finance-manager / The Coon
 */
reimbursementsRouter.patch('', [
    async (req, res) => {
        console.log('reim patch called: ' + req.body);
        const id = req.body;
        const result = await reimbursementsDao.patch(id);
        res.json(result);
    }]);
