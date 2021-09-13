import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const RoomContext = React.createContext(null);

function RoomContextProvider({ children }) {
  // const roomId = localStorage.getItem('room_id');
  const currentUserId = localStorage.getItem('user_id');
  const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const getRooms = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BUNQ_API_BASE_URL}/user/${currentUserId}/conversation/${selectedRoomId}/message`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BUNQ_API_TOKEN}`,
      },
    })
      .then((response) => {
        setMessages(response.data.data);
      })
      .catch((e) => {
        setError(e);
      });
  }

  useEffect(() => {
    if(selectedRoomId) getRooms()
  }, [selectedRoomId]);

  const sendMessage = (messageToSend) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BUNQ_API_BASE_URL}/user/${currentUserId}/conversation/${selectedRoomId}/message`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BUNQ_API_TOKEN}`,
      },
      data: {
        text: messageToSend,
      },
    })
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data.data]);
      })
      .catch((e) => {
        setError(e);
      });
  };

  const value = { messages, error, sendMessage, setSelectedRoom, selectedRoom, selectedRoomId, setSelectedRoomId };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

function useRoom() {
  return useContext(RoomContext);
}

RoomContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

RoomContextProvider.defaultProps = {
  children: null,
};

export { RoomContextProvider, useRoom };
