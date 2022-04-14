import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import Container from './components/container';
import LandingPage from './components/landingPage';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import HomePage from './components/homePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <Router>
    <Container>
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/signIn">
        <SignIn />
      </Route>
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      </Switch>
    </Container>
  </Router>,
  document.getElementById('root')
);
