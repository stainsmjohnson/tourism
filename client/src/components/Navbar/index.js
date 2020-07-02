import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { ApolloConsumer } from "react-apollo";
import logo from '../../assets/logo192.png';
import SignoutIcon from '../../assets/icons/log-out.svg';
import './Navbar.css';


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
                        <img 
                            className="signout-button"
                            src={SignoutIcon}
                            alt="sign-out"
                            onClick={()=>signOut(client,history)}
                            />
                    )
                }
            }
        </ApolloConsumer>
    )
}

const UnAuth = () => (
    <>
        <div className="nav-links-left">
            <NavLink to="/" exact>
                <img className="nav-logo" src={logo} alt="logo"/>
            </NavLink>
            <ul className="navlinks">
                <li>
                    <NavLink className="nav-link" to="/signup">Create Account</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/signin">Login</NavLink>
                </li>
            </ul>
        </div>
    </>
)

const Auth = ({ history }) => (
    <>
        <div className="nav-links-left">
            <NavLink to="/" exact>
                <img className="nav-logo" src={logo} alt="logo"/>
            </NavLink>
            <ul className="navlinks">
                <li>
                    <NavLink className="nav-link" to="/recipe/add">Add Recipe</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </li>
            </ul>
        </div>
        <SignOut history={history}/>
    </>
)

const Navbar = ({ session, history }) => {
    const user = session?.getCurrentUser
    return (
        <nav className="navbar">
            {
                user
                ?<Auth history={history}/>
                :<UnAuth/>
            } 
        </nav>
    )
}
export default withRouter(Navbar);