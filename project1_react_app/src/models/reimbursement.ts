import User from './user';
import ReimbursementStatus from './reimbursement.status';
import ReimbursementType from './reimbursement.type';


export default class Reimbursement {
    reimbursementId: number;    // primary key
    author: User;             // foreign key -> User, not null
    amount: number;             // not null
    dateSubmitted: string;      // not null
    dateResolved: string;
    description: string;        // not null
    resolver: User;             // foreign key -> User
    status: ReimbursementStatus;             // foreign ey -> ReimbursementStatus, not null
    type: ReimbursementType;               // foreign key -> ReimbursementType

    constructor(reimbursementId: number, author: User, amount: number, dateSubmitted: string, dateResolved: string, description: string, resolver: User, status: ReimbursementStatus, type: ReimbursementType) {
        this.reimbursementId = reimbursementId;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.description = description;
        this.resolver = resolver;
        this.status = status;
        this.type = type;
    }
}
