import React, { useState, useEffect } from 'react';
import { Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChatRoomsList, CreateChatModal, CurrentUser } from './Sidebar/index';
import { useRoom } from '../../contexts/RoomContextProvider';

function Sidebar() {
  const { selectedRoom } = useRoom();
  const [showSidebar, setShowSidebar] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setShowSidebar(selectedRoom === null);
  }, [selectedRoom]);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section
      className={`sidebar h-100 d-md-flex flex-column overflow-hidden ${showSidebar}`}
    >
      <div className="sidebar__header d-flex justify-content-between align-items-center px-3">
        <CurrentUser />
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="tooltip-right">Create room</Tooltip>}
        >
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="create-chat__button"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </OverlayTrigger>

        <Modal show={modalOpen} onHide={closeModal}>
          <CreateChatModal
            className="create-chat__modal"
            closeModal={closeModal}
          />
        </Modal>
      </div>

      <ChatRoomsList toggleSidebar={() => setShowSidebar(!showSidebar)} />
    </section>
  );
}

export default Sidebar;
