export default class ReimburesmentStatus {
    statusId: number;   // primary key
    status: string;     // not null, unique

    constructor(statusId: number, status: string) {
        this.statusId = statusId;
        this.status = status;
    }
}