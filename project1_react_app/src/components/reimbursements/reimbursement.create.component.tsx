import React from 'react';
import { Button, Input } from 'reactstrap';
import { environment } from '../../environment';

interface IState {
    authors: any,
    newReimbursement: {
        author: number,
        amount: number,
        description: '',
        type: number
    },
    reimTypes: any,
    typeDropdown: {
        isOpen: boolean,
        selection: string
    },
    errorMessage?: string,
    successMessage?: string
}

export default class NewReimbursement extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            authors: [],
            newReimbursement: {
                author: 0,
                amount: 0,
                description: '',
                type: 1
            },
            reimTypes: [],
            typeDropdown: {
                isOpen: false,
                selection: ''
            }
        }

        this.setType = this.setType.bind(this);
    }

    async componentDidMount() {
        this.getAuthors();
        this.getType();
    }

    getType = async () => {
        const resp = await fetch(environment.context + '/reimbursements/types', {
            credentials: 'include'
        });
        const reimTypesFromServer = await resp.json();
        // console.log(reimTypes);

        this.setState({
            ...this.state,
            reimTypes:reimTypesFromServer
        });
    }

    getAuthors = async () => {
        const resp = await fetch(environment.context + '/users', {
            credentials: 'include'
        });
        const usersFromServer = await resp.json();
        this.setState({
            ...this.state,
            authors: usersFromServer
        });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            ...this.state,
            newReimbursement: {
                ...this.state.newReimbursement,
                [name]: event.target.value
            }
        });
    }
    // console.log(newReimbursement);

    toggleTypeDropdown = () => {
        this.setState({
            ...this.state,
            typeDropdown: {
                ...this.state.typeDropdown,
                isOpen: !this.state.typeDropdown.isOpen
            }
        });
    }

    selectAuthor = (event: any) => {
        this.setState({
            ...this.state,
            newReimbursement: {
                ...this.state.newReimbursement,
                author: event.target.value
            }
        })
    }

    setType = (event: any) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            newReimbursement: {
                ...this.state.newReimbursement,
                type: +value
            }
        });

    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        const body = {
            author:{
                userId: this.state.newReimbursement.author
            },
            amount: this.state.newReimbursement.amount,
            description: this.state.newReimbursement.description,
            type: {
                typeId: this.state.newReimbursement.type
            }

        }
        event.preventDefault();
        try {
            console.log('reim being submitted ' + this.state.newReimbursement.author)
            const resp = await fetch('http://localhost:8012/reimbursements', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const reimbursement = await resp.json();
            this.setState({
                ...this.state,
                successMessage: `Reimbursement ID ${reimbursement.reimbursementId} created!`
            })

        } catch (err) {
            console.log(err);
            console.log('Reimbursement submition error');
            this.setState({
                errorMessage: 'Reimbursement submission error'

            });
        }
    }

    render() {
        const users = this.state.authors;
        const types = this.state.reimTypes;
        return (
            <div>
                <form className="form-reimbursements table-light" onSubmit={this.submit}>
                    <p className="success-message">{this.state.successMessage}</p>
                    <h1 className="h3 mb-3 font-weight-normal">Enter a new reimbursement request</h1>
                    <p>Author
                        <label htmlFor="inputAuthor" className="sr-only">Author</label>

                        <Input type="select" onChange={this.selectAuthor}>
                            {
                                users.map((user: any) =>
                                    <option value={user.userId} key={'userId -' + user.username}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                )
                            }
                        </Input>
                    </p>
                    <p>Amount
                        <label htmlFor="inputAmount" className="sr-only">Amount</label>

                        <input type="text" id="inputAmount"
                            name="amount"
                            className="form-control"
                            placeholder="Amount"
                            onChange={this.handleChange}
                            value={this.state.newReimbursement.amount} required />
                    </p>
                    <p>Description
                        <label htmlFor="inputDescription" className="sr-only">Description</label>

                        <input type="text" id="inputDescription"
                            name="description"
                            className="form-control"
                            placeholder="Description"
                            onChange={this.handleChange}
                            value={this.state.newReimbursement.description} required />
                    </p>
                    <div>
                        <p>Reimbursement Type
                            <Input type="select" onChange={this.setType}>
                                {
                                    types.map((type: any) =>
                                        <option value={type.type_id} key={'typeId -' + type.type_id}>
                                            {type.reimbursement_type}
                                        </option>
                                    )
                                }
                            </Input>
                        </p>
                    </div>

                    {this.state.errorMessage && <p id="error-message">{this.state.errorMessage}</p>}

                    <Button color="success" type="submit">Submit Request</Button>
                </form>
            </div>
        );
    }
}
