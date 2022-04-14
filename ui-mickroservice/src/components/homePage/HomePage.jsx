import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../header';
import CarForm from '../carForm';
import axios from 'axios';
import ResultsTable from '../resultsTable';
import CarDetails from '../carDetails';
import { getAuthCookie } from '../../utils';
import { URL, CAR_FORM_UPDATE, CAR_FORM_CREATE } from '../../constants';
import { Button } from '@material-ui/core';
import './homePage.css';

const HomePage = () => {
  const history = useHistory();
  const [detailsId, setDetailsId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [results, setResults] = useState([]);
  const [authCookie, setAuthCookie] = useState('');
  const [forseRefresh, setForseRefresh] = useState(1);

  const deleteCar =  async (id) => {
    try {
      const { status } = await axios.delete(`${URL.cars}/${id}`, { headers: {'authorization': authCookie}});
      if (status !== 404) {
        setResults(results.filter(result => result.id !== id));
      }
    } catch (err) {
      if (err?.response?.status === 401) history.push('/signIn');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const cookie = getAuthCookie();
      setAuthCookie(cookie);

      try {
        const { data } = await axios({
          method: 'GET',
          headers: { 'authorization': cookie},
          url: URL.cars,
          params: {
            limit: 5
          },
        });

        setResults(data);    
      } catch (err) {
        if (err?.response?.status === 401) history.push('/signIn');
      }
    }

    fetchData();
  }, [history]);
  
  const showDetals = (id) => {
    setDetailsId(id);
  }

  const closeDetails = () => {
    setDetailsId(null);
  }

  const showUpdate = (id) => {
    setUpdateId(id);
  }

  const closeUpdate = () => {
    setUpdateId(null);
  }

  const onSubmit = () => {
    setShowCreateModal(false);
    setUpdateId(null);
    setForseRefresh(forseRefresh + 1);
  }

  return (
    <Fragment>
      <Header className="header-small" />
      <div className="content">
        <Button onClick={() => setShowCreateModal(true)} variant="contained">Create</Button>
        <div className="result-table" >
          {!!results.length && 
          <ResultsTable 
            onDeleteClick={deleteCar} 
            onMoreInfoClick={showDetals} 
            onUpdateClick={showUpdate}
            results={results}/>}
        </div>
      </div>
      {!!detailsId && 
        <CarDetails 
          open={!!detailsId} 
          handleClose={closeDetails} 
          id={detailsId} />
      }
      {showCreateModal && 
        <CarForm 
          formType={CAR_FORM_CREATE} 
          open={showCreateModal} 
          handleClose={() => setShowCreateModal(false)} 
          onSubmit={onSubmit}
          />
        }
      {!!updateId && 
        <CarForm 
          formType={CAR_FORM_UPDATE} 
          open={!!updateId} 
          handleClose={closeUpdate}
          onSubmit={onSubmit}
          car={results.find(({ id }) => id === updateId)}            
        />
        }
    </Fragment>
  )
}

export default HomePage;
