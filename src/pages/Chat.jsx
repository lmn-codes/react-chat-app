// TODO: implement bootstrap modal for create chat modal
import React, { useState, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
  ChatRoomsList,
  CreateChatModal,
  LogoutButton,
  ChatScreen,
} from '../components';
import { RoomContextProvider } from '../contexts/RoomContextProvider';
import { RoomsContextProvider } from '../contexts/RoomsContextProvider';

function Chat() {
  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <main>
      <section className="chat__wrapper">
        <RoomsContextProvider>
          <RoomContextProvider>
            <ChatRoomsList />
            <ChatScreen />
            <Button onClick={() => setModalOpen(true)} className="rounded-0 create-chat__button">
              Create chat
            </Button>
            <Modal show={modalOpen} onHide={closeModal}>
              <CreateChatModal closeModal={closeModal}/>
            </Modal>
            <LogoutButton />
          </RoomContextProvider>
        </RoomsContextProvider>
      </section>
    </main>
  );
}

export default Chat;
