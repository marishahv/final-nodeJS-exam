import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Header from '../header';
import { TextField, Button } from '@material-ui/core';
import './signUp.css';

const ERROR_MESSAGE = `Passwords doesn't match`;
const URL = 'http://localhost:5050/user';

const isEnabled = (formState, error) => {
  return (!!formState.username 
    && !!formState.email 
    && !!formState.password 
    && !!formState.repeatedPassword 
    && !error);
};

const SignUp = () => {
  const history = useHistory();
  const [passwordError, setPasswordError] = useState(false);
  const [validationError, setValidationError] = useState('')
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    repeatedPassword: ''
  });

  const onChange = (event, type) => {
    const { value } = event.target;
    setValidationError('');

    if (type === 'repeatedPassword' && formState.password !== value) setPasswordError(true);
    else setPasswordError(false);

    setFormState({ ...formState, [type]: value});
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = formState;

    try { 
      await axios({
        method: 'POST',
        url: URL,
        data: { username, email, password }
      });

      setValidationError('');
      history.push('/signIn');
    } catch (err) {
      const errorMessage = err?.response?.data?.message || '';
      if (errorMessage.includes('Validation error')) setValidationError(errorMessage);
      console.log('Request error: ', err?.response);
    }
  }

  return (
    <Fragment>
      <Header className="header-small"/>
      {!!validationError && <p className="validation-msg">{validationError}</p>}
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
          label="Name" 
          variant="outlined" 
          onChange={(event) => onChange(event, 'username')}
        />
        <TextField id="outlined-basic" 
          style={{marginBottom: '20px'}} 
          className="text-field" 
          label="Password"
          type="password"
          variant="outlined"
          error={passwordError}
          helperText={passwordError && ERROR_MESSAGE}
          onChange={(event) => onChange(event, 'password')}
        />
        <TextField id="outlined-basic" 
          style={{marginBottom: '20px'}} 
          className="text-field" 
          label="Repeat password"
          type="password"
          variant="outlined"
          helperText={passwordError && ERROR_MESSAGE}
          error={passwordError}
          onChange={(event) => onChange(event, 'repeatedPassword')}
        />
        <Button type="submit" disabled={!isEnabled(formState, passwordError)}>
          Sign up
        </Button>
      </form>
    </Fragment>
  )
}

export default SignUp;
