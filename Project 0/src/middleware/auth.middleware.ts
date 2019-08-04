
// export function authMiddleware(...roles) {
//     return (req, res, next) => {
//         if(req.session.user) {
//             if(roles.includes(req.session.user.role)){
//                 next();
//             } else {
//                 // 403 means forbidden which means we know who they are
//                 // they just don't have the right access
//                 res.status(403);
//                 res.send('Permission Denied')
//             }
//         } else {
//             // 401 is Unauthorized which really means Unauthenticated
//             // they don't have access because we don't know who they are
//             res.sendStatus(401);
//         }
//     }
// }

/**
 * Auth middleware, same as above code just different sytax
 * @param roles
 */
export const authMiddleware = (...roles) => (req, res, next) => {
    // console.log('req.session.user: ' + req.session.user);
    if (req.session.user) {
        // console.log('current user role = ', req.session.user.role);
        // console.log('current user role.role = ', req.session.user.role.role);
        if (roles.includes(req.session.user.role.role )) {
            console.log('roles.include was true');
            next();
        } else {
            // 403 means forbidden which means we know who they are
            // they just don't have the right access
            console.log('roles.include was false');
            res.status(403);
            res.send('Permission Denied');
        }
    } else {
        // 401 is Unauthorized which really means Unauthenticated
        // they don't have access because we don't know who they are
        res.sendStatus(401);
    }
};