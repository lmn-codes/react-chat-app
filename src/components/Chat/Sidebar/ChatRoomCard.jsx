import React from 'react';
import PropTypes from 'prop-types';

function ChatRoomCard({ room }) {
  const currentUserId = JSON.parse(localStorage.getItem('user_id'));
  let roomName;

  function getLastMessage(message) {
    // shorten the original message to fit the room card
    return message.substr(0, 25);
  }

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
        {room.last_message && (
          <div className="chat-room-last-message__wrapper">
            <p className="chat-room__last-message">
              {getLastMessage(room.last_message.text)}
            </p>
          </div>
        )}
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
