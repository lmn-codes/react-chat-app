import React, { useState, useContext } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faArrowLeft,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useRoom } from '../../contexts/RoomContextProvider';
import { UsersContext } from '../../contexts/UsersContextProvider';

function ChatScreen() {
  const users = useContext(UsersContext);
  const { messages, error, setSelectedRoom, selectedRoom, sendMessage } = useRoom();
  const currentUserId = JSON.parse(localStorage.getItem('user_id'));
  const [messageToSend, setMessageToSend] = useState('');
  let roomName;

  if (!selectedRoom)
    return (
      <section className="wrapper__empty h-100 d-flex align-items-center justify-content-center">
        <p>No room selected. Please enter one!</p>
      </section>
    );

  if (!selectedRoom.name) {
    const theOtherMember = selectedRoom.members.filter(
      (mem) => mem.id !== currentUserId
    );
    roomName = theOtherMember[0].name;
  } else {
    roomName = selectedRoom.name;
  }

  function handleSend(e) {
    e.preventDefault();
    if (messageToSend) {
      sendMessage(messageToSend);
      setMessageToSend('');
    }
  }

  const senderName = (id) => {
    const user = users.filter((u) => u.id === id);
    return user[0].name;
  };

  function goBack() {
    setSelectedRoom(null);
  }

  const getRoomInfo = () => {
    const memberArray = selectedRoom.members.map((mem) => mem.name);
    return memberArray.join(', ');
  };

  return (
    <section className="chat-screen h-100 d-flex flex-column justify-content-between flex-grow-1">
      <div className="chat-screen__header d-flex justify-content-between align-items-center">
        <button className="back__button" type="button" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h5 className="chat-screen__name">
          <strong>{roomName}</strong>
        </h5>
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip id="tooltip-left">{`Members: ${getRoomInfo()}`}</Tooltip>
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
        </OverlayTrigger>
      </div>

      <div className="chat-screen__messages__wrapper overflow-auto p-3">
        <div className="chat-screen__messages-list d-flex flex-column align-items-start justify-content-end px-3">
          {[...messages].reverse().map((message) => {
            if (message.user_id === currentUserId) {
              return (
                <div
                  key={message.id}
                  className="chat-message__wrapper align-self-end align-items-end"
                >
                  <p className="user-message text-end text-break">
                    {message.text}
                  </p>
                  <p className="sender text-end text-muted text-break small">
                    You
                  </p>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className="chat-message__wrapper align-items-start"
              >
                <p className="member-message text-start text-break">
                  {message.text}
                </p>
                <p className="sender text-start text-muted small text-break">
                  {senderName(message.user_id)}
                </p>
              </div>
            );
          })}
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <div className="chat-screen__form">
        <form action="POST" className="d-flex h-100">
          <label
            className="send-message__label flex-grow-1 h-100"
            htmlFor="messageToSend"
          >
            <input
              className="send-message__input-field w-100 h-100"
              name="messageToSend"
              type="text"
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="chat-screen__send-button px-4 d-flex justify-content-center align-items-center"
            onClick={handleSend}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChatScreen;
