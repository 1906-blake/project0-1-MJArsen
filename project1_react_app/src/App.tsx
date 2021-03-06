import './App.css';
import './include/bootstrap';

import { } from "module";
import { } from 'reactstrap';
import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { SignIn } from './components/signin/signin.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UsersComponent } from './components/users/users.component';
import { NotFound } from './components/not-found/not-found.componenet';
import ReimbursementAll from './components/reimbursements/reimbursement.component';
import ReimbursementByStatus from './components/reimbursements/reimbursements.status.component';
import NewReimbursement from './components/reimbursements/reimbursement.create.component';
import ReimbursementByEmployee from './components/reimbursements/reimbursements.employee.component';
import UserProfile from './components/users/user.profile.component';


const App: React.FC = () => {
  return (
    // the redux store needs to wrap all of the rest of our components
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavComponent />
          <Switch>
            <Route path='/sign-in' component={SignIn} />
            <Route path='/reimbursements/status' component={ReimbursementByStatus} />
            <Route path='/reimbursements/employees' component={ReimbursementByEmployee} />
            <Route path='/new/reimbursement' component={NewReimbursement} />
            <Route path='/reimbursements' component={ReimbursementAll} />
            <Route path='/user/profile' component={UserProfile} />
            <Route path='/user/id' component={UsersComponent} />
            <Route path='/users' component={UsersComponent} />
            <Route component={NotFound} />

            {/* <Route path='/dashboard' component={DashboardComponent}/>
                    <Route path='/profile' component={ProfileComponent}/>
                    <Route path='/users/all' component={AllUsersComponent}/>
                    <Route path='/users/id' component={UsersByUserIdComponent}/>
                    <Route path='/users' component={UsersComponent}/>
                    <Route path='/login' component={LoginComponent}/>
                    <Route path='/reimbursements/all' component={AllReimbursementsComponent}/>
                    <Route path='/reimbursements/author' component={ReimbursementsByAuthorComponent}/>
                    <Route path='/reimbursements/status' component={ReimbursementsByStatusComponent}/>
                    <Route path='/reimbursements' component={ReimbursementsComponent}/> */}
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;