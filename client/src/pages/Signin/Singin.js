import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { withRouter } from "react-router-dom";
import { SIGNIN_USER } from '../../queries';
import './Signin.css'

const initialState = {
    username:'',
    password:'',
}

class Signin extends Component {
    state = {...initialState}

    formChange = ({ target }) => {
        this.setState({
            [target.name]:target.value
        })
    }
    formSubmit = (e, signIn) => {
        e.preventDefault();
        signIn().then( async ({data}) => {
            console.log('SIGNIN SUCCESSFUL');
            localStorage.setItem('token',data.signIn.token);
            await this.props.refetch();
            this.setState(initialState);
            this.props.history.push('/')
        }).catch(err => {
            console.log(err)
        })
    }
    validateForm = () => {
        const { username, password } = this.state;
        const valid = username && password;
        return valid;
    }
    render() {
        const { username, password } = this.state;
        return (
            <div>
                <h2>Signin to Your Account</h2>
                <Mutation mutation={SIGNIN_USER} variables={{ username, password}}>
                    {
                        (signIn,{ data, loading, error}) => {
                            return (
                                <form className="form" onSubmit={event=>this.formSubmit(event,signIn)}>
                                    <input onChange={this.formChange} value={username} type="text" name="username" placeholder="Username"/>
                                    <input onChange={this.formChange} value={password} type="password" name="password" placeholder="Password"/>
                                    { error && <p>{error.message}</p> }
                                    { loading && <p>Loading...</p> }
                                    { data ? <p>data...</p> : ''}
                                    <input disabled={loading || !this.validateForm()} onChange={this.formChange} type="submit" value="Submit"/>
                                </form>
                            )
                        }
                    }
                </Mutation>
            </div>
        )
    }
}
export default withRouter(Signin);