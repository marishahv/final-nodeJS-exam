import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { getAuthCookie } from '../utils';
import { URL } from '../constants';

const useFetchDetails = (id) => {
  const history = useHistory();
  const [details, setDetails] = useState({});
  const cookie = getAuthCookie();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await axios({
            method: 'GET',
            headers: { 'authorization': cookie},
            url: `${URL.details}/${id}`
          });

          setDetails(data);    
        } catch (err) {
          if (err?.response?.status === 401) history.push('/signIn');
        }
      })()
    }
  }, [cookie, history, id]);

  return details;
};

export default useFetchDetails;
