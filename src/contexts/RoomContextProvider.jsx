import React from 'react';
import PropTypes from 'prop-types';
import useAPIRequest from '../hooks/useAPIRequest';

const RoomContext = React.createContext(null);

function RoomContextProvider({ children }) {
    const roomId = localStorage.getItem('room_id');
    const {
        data,
        error,
        isLoading,
    } = useAPIRequest({
        url: `/user/${localStorage.getItem('user_id')}/conversation/${roomId}/message`,
        method: 'get',
    });

    let messages;
    if(error) {
        messages = null;
    } else {
        messages = data;
    }
    if (isLoading) return <div>Loading...</div>;

    return <RoomContext.Provider value={messages}>{children}</RoomContext.Provider>
}

RoomContextProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
}

RoomContextProvider.defaultProps = {
    children: null
}

export { RoomContextProvider, RoomContext };


