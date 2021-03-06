import express from 'express';
import bodyParser from 'body-parser';

// import authenticate from './authentication'; //testing an authentication middleware
import { sessionMiddleware } from './middleware/session.middleware';
import { authRouter } from './routers/auth.router';
import { usersRouter } from './routers/users.router';
import { reimbursementsRouter } from './routers/reimbursements.router';

// specify the port will run on
const port = process.env.PORT || 8012;
const app = express();

// will authenticate each request and set request.user for other middleware (testing it out at a later point)
// app.use(authenticate);

/**
 * Loggin middleware
 * This callback will be invoked anytime a request is made
 * regardless of url or http method
 */
app.use((req, res, next) => {
    console.log(`request made with url: ${req.url} and method ${req.method}`),
        next(); // pass request on to search for the next piece of middleware
});

// set up body parser to convert json body to object stored on req.body
app.use(bodyParser.json());
app.use(sessionMiddleware);

/*******************************************
 * Needed for Project 1??
 ******************************************/
app.use((req, resp, next) => {
    console.log(req.get('host'));
    resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
    next();
  });

/*******************************************
 * Register Routers
 ******************************************/
app.use(authRouter);
app.use('/users', usersRouter);
app.use('/reimbursements', reimbursementsRouter);


app.listen(port, () => {
    console.log('app started on port: ' + port);
});