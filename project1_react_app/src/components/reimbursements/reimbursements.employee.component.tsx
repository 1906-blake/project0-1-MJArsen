import React, { Component } from 'react';
import Reimbursement from '../../models/reimbursement';
// import Status from '../../models/reimbursement.status';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { environment } from '../../environment';
import User from '../../models/user';


interface IState {
    reimbursements: Reimbursement[],
    users: User[],
    employeesDropdown: {
        isOpen: boolean,
        selection: string
    }
}


export default class ReimbursementByEmployee extends Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [],
            users: [],
            employeesDropdown: {
                isOpen: false,
                selection: 'All'
            }
        }
    }

    async componentDidMount() {
        this.getUsers();
        this.getReimbursements();
    }

    getUsers = async () => {
        const resp = await fetch(environment.context + '/users', {
            credentials: 'include'
        });
        const users = await resp.json();
        this.setState({
            ...this.state,
            users
        });
    }

    getReimByUser = async (userName: string, userId: number) => {
        console.log('getReimByUser userName: ' + userName);
        console.log('getReimByUser userId: ' + userId);
        const resp = await fetch(environment.context + '/reimbursements/author/' + userId, {
            credentials: 'include'
        });
        const reimFromServer = await resp.json();
        // console.log('from server: ' + reimFromServer);
        // console.log('from server @ 0: ' + reimFromServer[0]);
        this.setState({
            ...this.state,
            reimbursements: reimFromServer,
            employeesDropdown: {
                ...this.state.employeesDropdown,
                selection: userName
            }
        });
    }

    getReimbursements = async () => {
        const resp = await fetch(environment.context + '/reimbursements', {
            credentials: 'include'
        });
        // console.log('resp: ' + resp.json());
        const reimbursements = await resp.json();
        this.setState({
            ...this.state,
            reimbursements,
            employeesDropdown: {
                ...this.state.employeesDropdown,
                selection: 'All'
            }
        });
    }

    toggleDD = () => {
        this.setState({
            employeesDropdown: {
                ...this.state.employeesDropdown,
                isOpen: !this.state.employeesDropdown.isOpen
            }
        })
    }

    approveReim = async (reimbursementId: any) => {
        const body = {
            reimbursementId,
            status: {
                statusId: 2
            }

        }
        await fetch('http://localhost:8012/reimbursements', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });

        this.getReimbursements();

    }

    denyReim = async (reimbursementId: any) => {
        const body = {
            reimbursementId,
            status: {
                statusId: 3
            }

        }
        await fetch('http://localhost:8012/reimbursements', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
        this.getReimbursements();
    }

    getApDeButtons = (reimId: number, reimSta: number) => {
        const currentUser = localStorage.getItem('user');
        const user = currentUser && JSON.parse(currentUser);
        console.log('userId: ' + user.userId);
        if (user.role.roleID === 1) {
            if (reimSta === 1) return (<td>
                <Button color='success' onClick={() => this.approveReim(reimId)}>Approve</Button>
                    <Button color='warning' onClick={() => this.denyReim(reimId)}>Deny</Button>
            </td>)
        }
    }

    render() {
        const reimbursements = this.state.reimbursements;
        const employees = this.state.users;
        return (
            <div id="reimbursements-table-container">
                <h1 className="h3 mb-3 font-weight-normal">View Reimbursements By Employee</h1>
                <ButtonDropdown id="reimbursements-status-dropdown"
                    isOpen={this.state.employeesDropdown.isOpen}
                    toggle={this.toggleDD}>

                    <DropdownToggle caret>
                        {this.state.employeesDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getUsers}>All</DropdownItem>
                        {
                            employees.map(employee=>
                                <DropdownItem value={employee.username} key={'userId-' + employee.userId} onClick={() => this.getReimByUser(employee.username, employee.userId)}>
                                    {employee.username}
                                </DropdownItem>
                            )
                        }

                    </DropdownMenu>
                </ButtonDropdown>
                <table className="table table-striped table-light">
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount for Reimbursement</th>
                            <th scope="col">Reimbursement Type</th>
                            <th scope="col">Date Submitted</th>
                            <th scope="col">Reimbursement Overseer</th>
                            <th scope="col">Current Status</th>
                            <th scope="col">Date Resolved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reimbursements.map(reimbursement =>
                                <tr key={'reimbursementId-' + reimbursement.reimbursementId}>
                                    <td>{reimbursement.reimbursementId}</td>
                                    <td>{reimbursement.author.lastName}, {reimbursement.author.firstName}</td>
                                    <td>"{reimbursement.description}"</td>
                                    <td>${reimbursement.amount.toFixed(2)}</td>
                                    <td>{reimbursement.type.type}</td>
                                    <td>{reimbursement.dateSubmitted.substr(5, 2)}/{reimbursement.dateSubmitted.substr(8, 2)}/{reimbursement.dateSubmitted.substr(0, 4)}</td>
                                    <td>{reimbursement.resolver && `${reimbursement.resolver.lastName}, ${reimbursement.resolver.firstName}`}</td>
                                    <td>{reimbursement.status.status}</td>
                                    <td>{reimbursement.dateResolved && `${reimbursement.dateResolved.substr(5, 2)}/${reimbursement.dateResolved.substr(8, 2)}/${reimbursement.dateResolved.substr(0, 4)}`}</td>
                                    {this.getApDeButtons(reimbursement.reimbursementId, reimbursement.status.statusId)}
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    };
}