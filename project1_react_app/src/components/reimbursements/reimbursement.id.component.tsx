import React, { Component } from 'react'
import Reimbursements from '../../models/reimbursement';

interface IState {
    reimbursements: Reimbursements[]
}

export default class ReimbursementId extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: []
        };
    }

    async componentDidMount() {
        const resp = await fetch('http://localhost:8012/reimbursements', {
            credentials: 'include'
        });
        const reimbursements = await resp.json();
        this.setState({
            reimbursements
        });
    }

    render() {
        const reimbursements = this.state.reimbursements;
        return (
            <div id="card-table-container">
                <table className="table table-striped table-dark">
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
                                <tr key={'reimbursementId-'+reimbursement.reimbursementId}>
                                    <td>{reimbursement.reimbursementId}</td>
                                    <td>{reimbursement.author.lastName}, {reimbursement.author.firstName}</td>
                                    <td>"{reimbursement.description}"</td>
                                    <td>${reimbursement.amount.toFixed(2)}</td>
                                    <td>{reimbursement.type.type}</td>
                                    <td>{reimbursement.dateSubmitted.substr(5,2)}/{reimbursement.dateSubmitted.substr(8,2)}/{reimbursement.dateSubmitted.substr(0,4)}</td>                                    
                                    <td>{reimbursement.resolver && `${reimbursement.resolver.username}`}</td>
                                    <td>{reimbursement.status.status}</td>
                                    <td>{reimbursement.dateResolved && `${reimbursement.dateResolved.substr(5,2)}/${reimbursement.dateResolved.substr(8,2)}/${reimbursement.dateResolved.substr(0,4)}`}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}