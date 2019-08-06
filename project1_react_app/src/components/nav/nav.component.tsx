import React from 'react';
import User from '../../models/user';
import { Link } from 'react-router-dom';
import CoonLogo from '../../assets/Coon.logo.jpg';
import { Button } from 'reactstrap';

interface IState {
  currentUser?: User
}

export class NavComponent extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = ({
      currentUser: {
        userId: 0,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: {
          roleID: 0,
          role: ''
        }
      }
    });
  }

  getUser = () => {
    const currentUserString = localStorage.getItem('user');
    const currentUser = currentUserString && JSON.parse(currentUserString);
    this.setState({
      ...this.state,
      currentUser
    })
  }

  componentDidMount(){
    this.getUser();
  }

  // componentDidUpdate(prevProps: any, prevState: any) {
  //   if(this.state.currentUser !== prevState.currentUser){
  //     this.getUser();
  //   }
  // }

  logout = () => {
    localStorage.setItem('user', '');
    this.setState({
      currentUser: {
        userId: 0,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: {
          roleID: 0,
          role: ''
        }
      }
    });
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={CoonLogo} alt="Coon" />
          </Link>
        </div>
        <div className="nav-item active">
          <div>
            <h3><strong>{this.state.currentUser && this.state.currentUser.username}</strong></h3>
          </div>
        </div>

        <div className="nav-item active">
          {
            this.state.currentUser && (this.state.currentUser.userId)
              ? <Button id='sign-out' color="btn btn-warning" onClick={this.logout}><Link to='/sign-in'>Sign Out</Link></Button>
              : <Button id='sign-in' color="btn btn-danger"><Link to="/sign-in">Sign In</Link></Button>
          }
        </div>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
            { this.state.currentUser && (this.state.currentUser.role)
            ?<ul className="navbar-nav ml-auto margin-nav">
              <li className="nav-item active" id='users'>
              {
                    this.state.currentUser && (this.state.currentUser.role.roleID === 1)
                    ?<h4><Link to="/users" className="unset-anchor nav-link">Users</Link></h4>
                    : null
              }
              </li>
              <li className='nav-item active' id='profile'>
                <h4><Link to="/userprofile" className="unset-anchor nav-link">Profile</Link></h4>
              </li>
              <li className="nav-item active dropdown" >
                <h4><div className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Reimbursements</div>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="examples-dropdown">
                  <h4><div className="dropdown-item"><Link to="/reimbursements" className="unset-anchor nav-link active">Your Reimbursements</Link></div></h4>
                  <h4><div className="dropdown-item"><Link to="/new/reimbursement" className="unset-anchor nav-link active">Create New Reimbursement</Link></div></h4>
                  {
                    this.state.currentUser && (this.state.currentUser.role.roleID === 1)
                      ? <h4><div className="dropdown-item"><Link to="/reimbursements/status" className="unset-anchor nav-link active">Reimbursements By Status</Link></div></h4>
                      : <div></div>
                  }
                  {
                    this.state.currentUser && (this.state.currentUser.role.roleID === 1)
                      ? <h4><div className="dropdown-item"><Link to="/reimbursements/employees" className="unset-anchor nav-link active">Reimbursements By Employees</Link></div></h4>
                      : <div></div>
                  }
                </div></h4>
              </li>
          </ul>
              :null
          }
        </div>
      </nav>
    );
  }
}