import User from "../models/user";

let users: User[] = [

];

export function findAll(): User[] {
    return users;
}

export function findByUserid(userId: number): User {
    return users.filter(user => user.userId === userId)[0];
}

export function save(user?: User) {
    users.push(user);
}

export function patch(user: Partial<User>) {
    users = users.map(ele => {
        if (user.userId === ele.userId) {
            return {
                ...ele,
                ...user
            }
        } else {
            return ele
        }
    });
}
