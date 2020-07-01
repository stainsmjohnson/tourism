import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import HomePage from './pages/Home/Home';
import SignupPage from './pages/Signup/Signup';
import SigninPage from './pages/Signin/Singin';
import RecipePage from './pages/Recipe';

import NavBar from './components/Navbar';

const PageNotFound = () => (
  <h1>Page You Are Looking For is Not Found</h1>
)

const App = ({ refetch, session }) => {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar session={session}/>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/recipe/add" exact component={PageNotFound}/>
          <Route path="/recipe/:_id" component={RecipePage}/>
          <Route path="/profile" component={PageNotFound}/>
          <Route path="/signup" render={() => <SignupPage refetch={refetch}/>}/>
          <Route path="/signin" render={() => <SigninPage refetch={refetch}/>}/>
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>  
    </div>
);
  }

export default App;
