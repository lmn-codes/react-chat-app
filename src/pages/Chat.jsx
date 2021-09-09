import React, {useState} from 'react';
import {ChatRoomsList, CreateChatModal, LogoutButton, ChatScreen, CreateChatButton} from '../components';
import {RoomContextProvider} from '../contexts/RoomContextProvider';

function Chat() {
    const [showModal, setShowModal] = useState(false);
    const [showRoomsList, setShowRoomsList] = useState(false);

    return (
        <main>
            <section className="chat__wrapper">
                <RoomContextProvider>
                    <button type="button" className="show-rooms__button" onClick={() => setShowRoomsList(!showRoomsList)}>Show Rooms</button>
                    <CreateChatButton showModal={() => setShowModal(!showModal)}/>
                    {showRoomsList && <ChatRoomsList/>}
                    <ChatScreen/>
                    {showModal && <CreateChatModal/>}
                    <LogoutButton/>
                </RoomContextProvider>
            </section>
        </main>
    )
}

export default Chat;