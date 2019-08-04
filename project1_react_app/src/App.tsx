import React from 'react';

import './App.css';
import './include/bootstrap';

import { } from "module";
import { } from 'reactstrap';
import { NotFound } from './components/not-found/not-found.componenet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavComponent } from './components/nav/nav.component';
import { SignIn } from './components/signin/signin.component';
import { UsersComponent } from './components/users/users.component';
import Reimbursement from './components/reimbursements/reimbursement.component';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  return (
    // the redux store needs to wrap all of the rest of our components
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavComponent />
          <Switch>
            <Route path='/sign-in' component={SignIn} />
            <Route path='/reimbursements' component={Reimbursement} />
            <Route path='/reimbursements/status/:statusId' component={Reimbursement} />
            <Route path='/user/id' component={UsersComponent} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
