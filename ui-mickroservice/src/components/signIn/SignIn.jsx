import React, { useState, Fragment }  from 'react';
import { useHistory } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import Header from '../header';
import './signIn.css';

const URL = 'http://localhost:5050/login';

const SignIn = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    try { 
      const response = await axios({
        method: 'POST',
        url: URL,
        data: formState
      });

      const token = response.data;
      document.cookie = `jwt=${token}`;

      history.push('/home');
    } catch (err) {
      console.log('Request error: ', err);
    }
  }

  const onChange = (event, fieldType) => {
    const value = event.target.value;
    setFormState({ ...formState, [fieldType]: value})
  }

  return (
    <Fragment>
      <Header className="header-small"/>
      <form className="login" onSubmit={onSubmit}>
        <TextField id="outlined-basic" 
          style={{marginBottom: '20px'}} 
          className="text-field" 
          label="Email"    
          variant="outlined" 
          onChange={(event) => onChange(event, 'email')}
          />
        <TextField id="outlined-basic" 
          style={{marginBottom: '20px'}} 
          className="text-field" 
          label="Password" 
          variant="outlined"
          type="password"
          onChange={(event) => onChange(event, 'password')}
        />
        <Button type="submit">
          Sign in
        </Button>
      </form>
    </Fragment>
  );
};

export default SignIn;
