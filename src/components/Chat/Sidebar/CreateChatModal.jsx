import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { UsersContext } from '../../../contexts/UsersContextProvider';
import { useRooms } from '../../../contexts/RoomsContextProvider';

function CreateChatModal({ closeModal }) {
  const users = useContext(UsersContext);
  const currentUserId = JSON.parse(localStorage.getItem('user_id'));
  const usersToAdd = users.filter((user) => user.id !== currentUserId);
  const [members, setMembers] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');
  const { createRoom } = useRooms();

  function handleUserChosen(id) {
    let newArray = [];
    // if user is already in the list, remove them
    if (members.includes(id)) {
      newArray = members.filter((member) => member !== id);
    } else {
      newArray = [...members, id];
    }
    setMembers(newArray);
  }

  function handleCreateRoom(e) {
    e.preventDefault();
    if (!roomName && members.length > 1) {
      setError('Room name is required!');
    } else {
      createRoom(members, roomName);
      closeModal();
    }
  }

  return (
    <>
      <Modal.Header closeButton>Create chat</Modal.Header>

      <Modal.Body className="d-flex flex-column align-items-center">
        <div className="create-chat__modal">
          <div className="create-chat__users__wrapper mb-3">
            {usersToAdd.map((user) => (
              <button
                className={
                  members.includes(user.id)
                    ? 'users-to-add__button selected'
                    : 'users-to-add__button'
                }
                type="button"
                key={user.id}
                onClick={() => {
                  handleUserChosen(user.id);
                }}
              >
                {user.name}
              </button>
            ))}
          </div>
          {members.length > 1 && (
            <form className="mb-4" onSubmit={handleCreateRoom}>
              <label
                className="room-name__label w-100 d-flex flex-column align-items-center"
                htmlFor="Room name"
              >
                <p>
                  Room name <span className="d-inline text-danger">*</span>
                </p>
                <input
                  className="room-name__input"
                  type="text"
                  required
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </label>
            </form>
          )}
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button
          className="create-room__button"
          type="button"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </Modal.Body>
    </>
  );
}

CreateChatModal.propTypes = {
  closeModal: PropTypes.func,
};

CreateChatModal.defaultProps = {
  closeModal: null,
};

export default CreateChatModal;
