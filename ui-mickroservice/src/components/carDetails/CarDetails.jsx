import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '../modal';
import capitalize from 'lodash/capitalize';
import useFetchDetails from '../../hooks/useFetchDetails';

const CarDetails = ({ id, open, handleClose }) => {
  const details = useFetchDetails(id);
  const title = 'Main characteristics.'

  const actions = <Button onClick={handleClose}>Close</Button>;

  const message = (
    <Fragment>
      This is a { capitalize(details?.CarBody?.type) }. <br/>
      This car has a robust engine with { details?.Engine?.power } horsepower. 
      The acceleration time to a speed of 100 km/h is { details?.speed } seconds.
    </Fragment>
  );

  return (
    <Modal 
      open={open} 
      handleClose={handleClose} 
      title={title} 
      message={message} 
      actions={actions}>
        <img src={details?.image} alt="Car"/>
    </Modal>
  );
}

export default CarDetails;
