import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { withRouter } from "react-router-dom";
import { SIGNUP_USER } from '../../queries'
import './Signup.css';

const initialState = {
    username:'',
    email:'',
    password:'',
    rePassword:''
}

class Signup extends Component {
    state = {...initialState}

    formChange = ({ target }) => {
        this.setState({
            [target.name]:target.value
        })
    }
    formSubmit = (e, signUp) => {
        e.preventDefault();
        signUp().then( async ({data}) => {
            console.log('SIGNUP SUCCESSFUL');
            localStorage.setItem('token',data.signUp.token);
            await this.props.refetch();
            this.setState(initialState);
            this.props.history.push('/')
        }).catch(err => {
            console.log(err)
        })
    }
    validateForm = () => {
        const { username, email, password, rePassword } = this.state;
        const valid = username && email && password && password===rePassword;
        return valid;
    }
    render() {
        const { username, email, password, rePassword } = this.state;
        return (
            <div>
                <h2>Create New Account</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password}}>
                    {
                        (signUp,{ data, loading, error}) => {
                            return (
                                <form className="form" onSubmit={event=>this.formSubmit(event,signUp)}>
                                    <input onChange={this.formChange} value={username} type="text" name="username" placeholder="Username"/>
                                    <input onChange={this.formChange} value={email} type="email" name="email" placeholder="Email Address"/>
                                    <input onChange={this.formChange} value={password} type="password" name="password" placeholder="Password"/>
                                    <input onChange={this.formChange} value={rePassword} type="password" name="rePassword" placeholder="Confirm Password"/>
                                    { error && error.message }
                                    { loading && <p>Loading...</p> }
                                    { data && <p>data...</p> }
                                    <input disabled={loading || !this.validateForm()} onChange={this.formChange} type="submit" className="button-primary" value="Submit"/>
                                </form>
                            )
                        }
                    }
                </Mutation>
            </div>
        )
    }
}
 export default withRouter(Signup);