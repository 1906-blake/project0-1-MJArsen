import React, { Component } from 'react';
// import User from '../../models/user';
import { Button } from 'reactstrap';

interface IState {
    currentUser: {
        userId: 0,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: 0,
        roleType: ''
    },
    errorMessage?: string
}

export default class Profile extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: {
                userId: 0,
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                role: 0,
                roleType: ''
            }
        };
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {

        const currentLoggedInUser = localStorage.getItem('user');
        const user = currentLoggedInUser && JSON.parse(currentLoggedInUser);

        this.setState({
            ...this.state,
            currentUser: {
                userId: user.userId,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role.roleID,
                roleType: user.role.role
            }
        });


    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            currentUser: {
                ...this.state.currentUser,
                [name]: event.target.value
            }
        });
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {

        console.log(this.state.currentUser);

        const body = {
            userId: this.state.currentUser.userId,  
            username: this.state.currentUser.username,   
            password: '',
            firstName: this.state.currentUser.firstName,
            lastName: this.state.currentUser.lastName,
            email: this.state.currentUser.email,   
            role: {
                role: this.state.currentUser.role,
                roleID: this.state.currentUser.roleType
            }
        }

        event.preventDefault();
        try {
            console.log('body: ' + body);
            const resp = await fetch('http://localhost:8012/users', {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const user = await resp.json();

            console.log(user);

            localStorage.setItem('user', JSON.stringify(user));

        } catch (err) {
            console.log(err);
            console.log('Error updating');
            this.setState({
                errorMessage: 'Error updating'

            });
        }
    }

    render() {
        const user = this.state.currentUser;
        console.log(user);
        return (
            <div>

                <h1 className="h3 mb-3 font-weight-normal">Your current profile</h1>
                <form className="form-profile" onSubmit={this.submit}>
                    <table className="table table-striped table-light">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                <tr key={'userId-' + user.userId}>
                                    <td>
                                        {this.state.currentUser.username}
                                    </td>
                                    <td>
                                        <label htmlFor="inputFirstName" className="sr-only">First Name</label>

                                        <input type="text" id="inputFirstName"
                                            name="firstName"
                                            className="form-control"
                                            placeholder="First Name"
                                            onChange={this.handleChange}
                                            value={this.state.currentUser.firstName} required />
                                    </td>
                                    <td>
                                        <label htmlFor="inputLastName" className="sr-only">Last Name</label>

                                        <input type="text" id="inputLastName"
                                            name="lastName"
                                            className="form-control"
                                            placeholder="Last Name"
                                            onChange={this.handleChange}
                                            value={this.state.currentUser.lastName} required />
                                    </td>
                                    <td>
                                        <label htmlFor="inputEmail" className="sr-only">Email</label>

                                        <input type="text" id="inputEmail"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            onChange={this.handleChange}
                                            value={this.state.currentUser.email} required />
                                    </td>
                                    <td>
                                        {this.state.currentUser.roleType}
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <Button color="success" type="submit">Apply Changes</Button>
                </form>
            </div>
        );
    }
}