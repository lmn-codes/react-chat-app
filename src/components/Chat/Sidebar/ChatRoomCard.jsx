import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRoom } from '../../../contexts/RoomContextProvider';

function ChatRoomCard({ room }) {
  const [thisRoomLastMessage, setThisRoomLastMessage] = useState('');
  const { lastMessage } = useRoom();
  const currentUserId = JSON.parse(localStorage.getItem('user_id'));
  let roomName;

  useEffect(() => {
    // if the lastMessage in context is changed (new message sent)
    // change the last message field in the card of the correct room (compared by id)
    if (lastMessage && lastMessage.roomId === room.id) {
      setThisRoomLastMessage(lastMessage.text.substr(0, 25));
    } else if (lastMessage && lastMessage.roomId !== room.id) {
      setThisRoomLastMessage((prevLastMessage) => prevLastMessage);
    // if the lastMessage in context is null
    } else if (room.last_message) {
      setThisRoomLastMessage(room.last_message.text.substr(0, 25));
    }
  }, [lastMessage])

  if (!room.name) {
    const theOtherMember = room.members.filter(
      (mem) => mem.id !== currentUserId
    );
    roomName = theOtherMember[0].name;
  } else {
    roomName = room.name;
  }

  return (
    <>
      <div className="chat-room__card d-flex flex-column justify-content-between overflow-hidden">
        <p>
          <strong className="chat-room__name">{roomName}</strong>
        </p>
          <div className="chat-room-last-message__wrapper">
            <p className="chat-room__last-message">
              {thisRoomLastMessage}
            </p>
          </div>
      </div>
    </>
  );
}

ChatRoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    last_message: PropTypes.objectOf(
      PropTypes.shape({
        text: PropTypes.string,
        sent_at: PropTypes.string,
        substr: PropTypes.func,
      })
    ),
  }),
};

ChatRoomCard.defaultProps = {
  room: null,
};

export default ChatRoomCard;
