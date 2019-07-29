export default class ReimburesmentStatus {
    statusId: number;   // primary key
    status: string;     // not null, unique

    constructor(statusId, status) {
        this.statusId = statusId;
        this.status = status;
    }
}