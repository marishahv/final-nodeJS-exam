import { Button } from '@material-ui/core';
import {  Link } from 'react-router-dom';
import Header from '../header';
import './landingPage.css';

const LandingPage = () => {
  return (
    <div className="home">
      <Header className="home-header"/>
      <Link className="signin-link" to="/signIn">
        <Button variant="contained">Sign In</Button>
      </Link>
      <Link className="signin-link" to="/signUp">
        <Button variant="contained">Sign Up</Button>
      </Link>
    </div>
  );
}

export default LandingPage;
