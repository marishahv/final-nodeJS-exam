import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select'
import axios from 'axios';
import capitalize from 'lodash/capitalize';
import { getAuthCookie } from '../../utils';
import { URL, CAR_FORM_CREATE } from '../../constants';
import Modal from '../modal';
import './carForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CarForm = ({ car, open, handleClose, formType, onSubmit }) => {
  const title = `${capitalize(formType)} car`;
  const message = car && car.id;
  const cookie = getAuthCookie();
  const history = useHistory();
  const [bodyTypes, setBodyTypes] = useState([]);
  const [engines, setEngines] = useState([]);
  const [formState, setFormState] = useState({
    color: car ? car.color : '',
    speed: car ? car.speed : '',
    image: car ? car.image : '',
    carBody: car ? car.CarBody.type : '',
    power: car ? car.Engine.power : ''
  });
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const { data: bodyTypes } = await axios({
          method: 'GET',
          headers: { 'authorization': cookie},
          url: URL.types,
        });

        const { data: engines } = await axios({
          method: 'GET',
          headers: { 'authorization': cookie},
          url: URL.engines,
        });
  
        setBodyTypes(bodyTypes);  
        setEngines(engines);  
      } catch (err) {
        if (err?.response?.status === 401) history.push('/signIn');
      }
    })()
  }, [cookie, history]);

  const onInputChange = (event, fieldType) => {
    setFormState({...formState, [fieldType]: event.target.value});
  }

  const bodyTypeOptions = () => {
    const options = bodyTypes.map(({type, id}) => <MenuItem key={id} value={type}>{capitalize(type)}</MenuItem>);
    return options;
  }

  const enginePowerOptions = () => {
    const options = engines.map(({power, id}) => <MenuItem key={id} value={power}>{power}</MenuItem>);
    return options;
  }

  const submitForm = async () => {
    const isCreate = formType === CAR_FORM_CREATE;
    try {
      await axios({
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'authorization': cookie},
        url: URL.cars,
        data: isCreate ? formState : {...formState, id: car.id}
      });
      onSubmit();
    } catch (err) {
      if (err?.response?.status === 401) history.push('/signIn');
    }
  }

  const actions = (
    <Fragment>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={submitForm}>{formType}</Button>
    </Fragment>
  )

  return (
    <Modal
      open={open} 
      handleClose={handleClose} 
      title={title} 
      message={message} 
      actions={actions}>
      <div className="form-wrapper">
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl>
            <InputLabel htmlFor="component-simple">Color</InputLabel>
            <Input id="component-simple" value={formState.color} onChange={(event) => onInputChange(event, 'color')} />
            <FormHelperText id="component-helper-text">Enter car color</FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-helper">Speed</InputLabel>
            <Input
              id="component-helper"
              value={formState.speed}
              onChange={(event) => onInputChange(event, 'speed')}
              aria-describedby="component-helper-text"
            />
            <FormHelperText id="component-helper-text">Enter car speed</FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-helper">Image</InputLabel>
            <Input
              id="component-helper"
              value={formState.image}
              onChange={(event) => onInputChange(event, 'image')}
              aria-describedby="component-helper-text"
            />
            <FormHelperText id="component-helper-text">Enter image url</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Car Body</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={formState.carBody}
              onChange={(event) => onInputChange(event, 'carBody')}
            >
            {bodyTypeOptions()}
            </Select>
            <FormHelperText>Select car body type</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Power</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={formState.power}
              onChange={(event) => onInputChange(event, 'power')}
            >
              {enginePowerOptions()}
            </Select>
            <FormHelperText>Select engine power</FormHelperText>
          </FormControl>
        </form>
      </div>
    </Modal>
  )
}

export default CarForm;
