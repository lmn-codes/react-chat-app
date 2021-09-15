import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const RoomsContext = React.createContext();

function RoomsContextProvider({ children }) {
  const currentUserId = localStorage.getItem('user_id');
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BUNQ_API_BASE_URL}/user/${currentUserId}/conversation`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BUNQ_API_TOKEN}`,
      },
    })
      .then((response) => {
        setRooms(response.data.data);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  const createRoom = (members, roomName) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BUNQ_API_BASE_URL}/user/${currentUserId}/conversation`,
      data: {
        user_ids: members,
        name: roomName,
      },
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BUNQ_API_TOKEN}`,
      },
    })
      .then((response) => {
        setRooms((previousRooms) => [response.data.data, ...previousRooms]);
      })
      .catch((e) => {
        setError(e);
      });
  };

  const value = { rooms, error, createRoom };

  return (
    <RoomsContext.Provider value={value}>{children}</RoomsContext.Provider>
  );
}

function useRooms() {
  return useContext(RoomsContext);
}

RoomsContextProvider.propTypes = {
  children: PropTypes.element,
};

RoomsContextProvider.defaultProps = {
  children: null,
};

export { RoomsContextProvider, useRooms };
