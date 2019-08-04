import React from 'react';
import { Link } from 'react-router-dom';
import CoonLogo from '../../assets/Coon.logo.jpg';
export class NavComponent extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={CoonLogo} alt="Coon" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            
            <li className="nav-item active">
              <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
            </li>
            <li className="nav-item active">
              <Link to="/" className="unset-anchor nav-link">Something Else</Link>
            </li>
            <li className="nav-item active dropdown">
              <div className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Reimbursements</div>
              <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                <div className="dropdown-item"><Link to="/reimbursements" className="unset-anchor nav-link active">Your Reimbursements</Link></div>
                <div className="dropdown-item"><Link to="/reimbursements" className="unset-anchor nav-link active">Nothing new</Link></div>
                <div className="dropdown-item"><Link to="/reimbursements" className="unset-anchor nav-link active">More Reimbursements</Link></div>
              </div>
            </li>
            <li className="nav-item active">
              {/* <Link to="/nested" className="unset-anchor nav-link">Log Out</Link> */}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}