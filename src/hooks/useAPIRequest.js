import { useState, useEffect } from 'react';
import axios from 'axios';

const useAPIRequest = ({ url, method, body = null ?? '' }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fullUrl = process.env.REACT_APP_BUNQ_API_BASE_URL + url;

  const config = {
    method,
    url: fullUrl,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_BUNQ_API_TOKEN}`,
    },
    body,
  };

  const performRequest = async () => {
    try {
      const response = await axios(config);
      setData(response.data.data);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    performRequest();
    // eslint-disable-next-line
  }, [url, method, body]);

  return { data, error, isLoading };
};

export default useAPIRequest;
