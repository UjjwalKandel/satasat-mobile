import {useState, useEffect} from 'react';

import axios from '../services/httpService';

const useAxios = params => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async params => {
    // setLoading(true);
    // try {
    //   const res = await axios.request(params);
    //   console.log(response, 'data fetched');
    //   setResponse(res.data);
    //   setError(null);
    // } catch (err) {
    //   setError(err);
    // } finally {
    //   setLoading(false);
    // }
    setLoading(true);
    console.log(params);
    axios
      .request(params)
      .then(res => setResponse(res.data))
      .catch(err => console.log(error, 'data fetching error useAxios hoook'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(params);
  }, []);

  return {response, error, loading};
};
export default useAxios;
