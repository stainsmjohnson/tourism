import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { ApolloConsumer } from "react-apollo";


const SignOut = ({ history }) => {
    const signOut = (client, history) => {
        localStorage.removeItem('token');
        client.resetStore();
        history.push('/');
    }
    return (
        <ApolloConsumer>
            {
                client => {
                    return (
                        <button onClick={()=>signOut(client,history)}>SignOut</button>
                    )
                }
            }
        </ApolloConsumer>
    )
}

const UnAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/signup">Create Account</NavLink>
        </li>
        <li>
            <NavLink to="/signin">Login</NavLink>
        </li>
    </ul>
)

const Auth = ({ history }) => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/recipe/add">Add Recipe</NavLink>
        </li>
        <li>
            <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
            <SignOut history={history}/>
        </li>
    </ul>
)

const Navbar = ({ session, history }) => {
    const user = session?.getCurrentUser
    return (
        <nav>
            {
                user
                ?<Auth history={history}/>
                :<UnAuth/>
            } 
        </nav>
    )
}
export default withRouter(Navbar);