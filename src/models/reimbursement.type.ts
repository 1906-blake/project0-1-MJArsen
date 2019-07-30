export default class ReimbursementType {
    typeId: number; // primary key
    type: string;   // not null, unique

    constructor(typeId: number, type: string) {
        this.typeId = typeId;
        this.type = type;
    }
}