import React, { Component } from 'react';
import Reimbursement from '../../models/reimbursement';
// import Status from '../../models/reimbursement.status';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { environment } from '../../environment';


interface IState {
    reimbursements: Reimbursement[],
    // status: Status[],
    reimbursementsDropdown: {
        isOpen: boolean,
        selection: string
    }
}


export default class ReimbursementByStatus extends Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [],
            // status: [],
            reimbursementsDropdown: {
                isOpen: false,
                selection: 'Pending'
            }
        }
    }

    async componentDidMount() {
        this.getByStatus(1);
    }

    // getStatus = async () => {
    //     const resp = await fetch(environment.context + '/reimbursements/status', {
    //     });
    //     const status = await resp.json();

    //     this.setState({
    //         status
    //     });
    // }
    
    getByStatus = async(status_id: number) => {
        const resp = await fetch(environment.context +'/reimbursements/status/' + status_id, {
            credentials: 'include'
        });
        const reimFromServer = await resp.json();
        // console.log('reimFromServer: '+ reimFromServer.status.status);
        this.setState({
            reimbursements: reimFromServer,
            reimbursementsDropdown: {
                ...this.state.reimbursementsDropdown,
                selection: reimFromServer[0] && reimFromServer[0].status.status
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
            reimbursements,
            reimbursementsDropdown: {
                ...this.state.reimbursementsDropdown,
                selection: 'All'
            }
        });
    }

    toggleDD = () => {
        this.setState({
            reimbursementsDropdown: {
                ...this.state.reimbursementsDropdown,
                isOpen: !this.state.reimbursementsDropdown.isOpen
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
    // adds approve and deny buttons onto reimbursements that are type pending
    getApDeButtons = (reimId: number, reimSta: number) => {
        const currentUser = localStorage.getItem('user');
        const user = currentUser && JSON.parse(currentUser);
        console.log('userId: ' + user.userId);
        if (user.role.roleID === 1) {
            // if (userId.role.roleID === 1 || userId === 6 || userId === 7) {
                if (reimSta === 1) return (<td>
                    <Button color='success' onClick={() => this.approveReim(reimId)}>Approve</Button>
                    <Button color='warning' onClick={() => this.denyReim(reimId)}>Deny</Button>
                </td>)
            // }
        }
    }

    render() {
        const reimbursements = this.state.reimbursements;
        return (
            <div id="reimbursements-table-container">
                <h1 className="h3 mb-3 font-weight-normal">View Reimbursements By Status</h1>
                <ButtonDropdown id="reimbursements-status-dropdown"
                    isOpen={this.state.reimbursementsDropdown.isOpen}
                    toggle={this.toggleDD}>

                    <DropdownToggle caret>
                        {this.state.reimbursementsDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getReimbursements}>All</DropdownItem>
                        <DropdownItem key={'status-dropdown-1'}
                            onClick={() => this.getByStatus(1)}>
                            Pending
                                        </DropdownItem>
                        <DropdownItem key={'status-dropdown-2'}
                            onClick={() => this.getByStatus(2)}>
                            Approved
                                        </DropdownItem>
                        <DropdownItem key={'status-dropdown-3'}
                            onClick={() => this.getByStatus(3)}>
                            Denied
                                        </DropdownItem>
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