import { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv';

const useAPIRequest = ({ url, method, body = null ?? '' }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fullUrl = env.BUNQ_API_BASE_URL + url;

  const config = {
    method,
    url: fullUrl,
    headers: {
      Authorization: `Bearer ${env.BUNQ_API_TOKEN}`,
    },
    body
  };

  const performRequest = async () => {
    try {
      const response = await axios(config);
      setData(response.data.data);
    } catch (err) {
      setError(err);
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
