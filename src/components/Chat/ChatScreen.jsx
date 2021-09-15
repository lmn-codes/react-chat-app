import React, { useState, useContext } from 'react';
import { useRoom } from '../../contexts/RoomContextProvider';
import { UsersContext } from '../../contexts/UsersContextProvider';

function ChatScreen() {
  const users = useContext(UsersContext);
  const { messages, error, selectedRoom, sendMessage } = useRoom();
  const currentUserId = JSON.parse(localStorage.getItem('user_id'));
  const [messageToSend, setMessageToSend] = useState('');
  let roomName;

  if (!selectedRoom)
    return (
      <section className="wrapper__empty">
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
    const user = users.filter(u => u.id === id);
    return user[0].name;
  }

  if (error) return <p className="error__message">{error}</p>;

  return (
    <section className="chat-screen h-100 d-flex flex-column flex-grow-1">
      <p className="chat-room__name">{roomName}</p>
      <div
        className={
          messages.length > 0 ? `chat-screen__messages flex-grow-1` : `wrapper__empty flex-grow-1`
        }
      >
        <div className="chat-screen__messages-list d-flex flex-column align-items-start justify-content-end px-3">
          {[...messages].reverse().map((message) => {
            if (message.user_id === currentUserId) {
              return (
                <div key={message.id} className="chat-message__wrapper align-self-end align-items-end">
                  <p className="user_message ">
                    {message.text}
                  </p>
                  <p className="sender">You</p>
                </div>
              );
            }

            return (
              <div key={message.id} className="chat-message__wrapper align-items-start">
                <p className="member_message">
                  {message.text}
                </p>
                <p className="sender">{senderName(message.user_id)}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-screen__form">
        <form action="POST" className="d-flex">
          <label className="send-message__label flex-grow-1 me-5" htmlFor="messageToSend">
            <input
              className="send-message__input-field w-100"
              name="messageToSend"
              type="text"
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="chat-screen__send-button w-15"
            onClick={handleSend}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChatScreen;
