import express from 'express';
import * as reimbursementsDao from '../daos/reimbursements.dao';
import { authMiddleware } from '../middleware/auth.middleware';
export const reimbursementsRouter = express.Router();

/*************************************************
 * GET Methods
 *************************************************/

/**
 * Find Reimbursement(s) by status ID
 */
reimbursementsRouter.get('/status/:statusId',
    async (req, res) => {
        const reim = await reimbursementsDao.findByStatusId(+req.params.statusId);
        res.json(reim);
});

/**
 * Find Reimbursement(s) by author ID (Employee ID)
 */
reimbursementsRouter.get('/author/:userId',
    async (req, res) => {
        const reimbursements = await reimbursementsDao.findByAuthorId(req.params.userId);
        res.json(reimbursements);
});

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
reimbursementsRouter.patch('', [authMiddleware('admin', 'finance-manager', 'The Coon'),
    async (req, res) => {
    const result = await reimbursementsDao.patch(req.body);
    res.send(result);
}]);
