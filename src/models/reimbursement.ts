import User from './user';

export default class Reimbursement {
    reimbursementId: number;    // primary key
    author: number;             // foreign key -> User, not null
    amount: number;             // not null
    dateSubmitted: number;      // not null
    dateResolved: number;
    description: string;        // not null
    resolver: User;             // foreign key -> User
    status: number;             // foreign ey -> ReimbursementStatus, not null
    type: number;               // foreign key -> ReimbursementType

    constructor(reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type) {
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
