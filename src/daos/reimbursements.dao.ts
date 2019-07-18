import Reimbursements from '../models/reimbursement';

let reimbursements = [

];

export function findByStatusId(statusId: number): Reimbursements {
    return reimbursements.filter(reimbursements => reimbursements.statusId === statusId)[0];
}

export function findByUser(userId: string): Reimbursements[] {
    return reimbursements.filter(reimbursements => reimbursements.author.userId === userId);
}

export function save(reimbursement?: Reimbursements) {
    reimbursements.push(reimbursement);
}

export function patch(reimbursement: Partial<Reimbursements>) {
    reimbursements = reimbursements.map(ele => {
        if (reimbursement.reimbursementId === ele.id) {
            return {
                ...ele,
                ...reimbursement
            }
        } else {
            return ele
        }
    });
}
