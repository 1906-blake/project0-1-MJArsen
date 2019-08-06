import React from 'react';
import User from '../../models/user';
import { environment } from '../../environment';

interface IState {
    users: User[]
}

export class UsersComponent extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }

    async componentDidMount() {
        this.getUsers();

    }

    //retrieves all users from the server
    getUsers = async () => {
        const resp = await fetch(environment.context + '/users', {
            credentials: 'include'
        });
        const users = await resp.json();
        this.setState({
            users
        });
    }

    render() {
        const users = this.state.users;
        return (
            <div id="card-table-container">
                <table className="table table-striped table-light">
                    <thead>
                        <tr>
                            <th scope='col'>User ID</th>
                            <th scope="col">UserName</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>
                                <tr key={'reimbursementId-' + user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.username}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.role}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}