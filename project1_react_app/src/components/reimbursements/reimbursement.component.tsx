import '../../index.scss';
import User from '../../models/user';
import React, { Component } from 'react'
import { environment } from '../../environment';
import Reimbursements from '../../models/reimbursement';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


interface IProps {
    currentUser?: User
}

interface IState {
    reimbursements: Reimbursements[],
    employees: [],
    selectionsDropdown: {
        isOpen: boolean,
        selection: string
    }
}

export default class Reimbursement extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [],
            employees: [],
            selectionsDropdown: {
                isOpen: false,
                selection: 'All'
            }
        };
    }

    async componentDidMount() {
        // this.getReimbursements();
        // this.getUsersReimbursements();
        // this.getEmployees();

    }

    getEmployees = async () => {
        const resp = await fetch(environment.context + '/users', {
            credentials: 'include'
        });

        const employees = await resp.json();
        this.setState({
            employees
        })
    }

    getReimbursements = async () => {
        const resp = await fetch(environment.context + '/reimbursements', {
            credentials: 'include'
        });
        // console.log('resp: ' + resp.json());
        const reimbursements = await resp.json();
        this.setState({
            reimbursements
        });
    }

    getUsersReimbursements = async () => {
        const resp = await fetch(environment.context + '/reimbursements/author', {
            credentials: 'include'
        });
        // console.log('resp: ' + resp.json());
        const reimbursements = await resp.json();
        this.setState({
            reimbursements
        });
    }

    getUsersReimbursementsByStatus = async () => {
        const resp = await fetch(environment.context + '/reimbursements/status/' , {
            credentials: 'include'
        });
        // console.log('resp: ' + resp.json());
        const reimbursements = await resp.json();
        this.setState({
            reimbursements
        });
    }

    getUsersReimbursements2 = async () => {
        const resp = await fetch(environment.context + '/reimbursements/author/', {
            credentials: 'include'
        });
        // console.log('resp: ' + resp.json());
        const reimbursements = await resp.json();
        this.setState({
            reimbursements
        });
    }

    toggleSelectionsDropdown = () => {
        this.setState({
            selectionsDropdown: {
                ...this.state.selectionsDropdown,
                isOpen: !this.state.selectionsDropdown.isOpen
            }
        });
    }

    render() {
        const reimbursements = this.state.reimbursements;
        return (
            <div id="card-table-container">
                <ButtonDropdown id="card-game-dropdown"
                    isOpen={this.state.selectionsDropdown.isOpen}
                    toggle={this.toggleSelectionsDropdown}>

                    <DropdownToggle caret>
                        {this.state.selectionsDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getReimbursements}>All</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.getUsersReimbursements}>Your Reimbursements</DropdownItem>
                        <DropdownItem> </DropdownItem>        
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
                                    <td>{reimbursement.resolver && `${reimbursement.resolver.username}`}</td>
                                    <td>{reimbursement.status.status}</td>
                                    <td>{reimbursement.dateResolved && `${reimbursement.dateResolved.substr(5, 2)}/${reimbursement.dateResolved.substr(8, 2)}/${reimbursement.dateResolved.substr(0, 4)}`}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}