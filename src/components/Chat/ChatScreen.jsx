// TODO: auto update the messages when new messages are added
// TODO: style the messages better, now it overflows
import React, { useState } from 'react';
import { useRoom } from '../../contexts/RoomContextProvider';

function ChatScreen() {
    const { messages, error, selectedRoom, sendMessage } = useRoom();
    const roomId = localStorage.getItem('room_id');
    const currentUserId = localStorage.getItem('user_id');
    const [messageToSend, setMessageToSend] = useState('');

    function handleSend() {
        sendMessage(messageToSend);
    }

    if(!roomId) return (
        <div className="chat-screen__no-messages">
            <p>No active messages. Please enter a room!</p>
        </div>
    )

    if(!selectedRoom) return <p>No room selected. Please enter one!</p>

    if(error) return <p className="error__message">{error}</p>

    return (
        <div className="chat-screen__wrapper">
            <p className="chat-room__name">{selectedRoom.name}</p>
            <div className="chat-screen__messages">
                {
                    messages.map((message) => {
                        if (message.user_id === parseInt(currentUserId, 10)) return <p key={message.id} className="user_message">{message.text}</p>
                        return <p key={message.id} className="member_message">{message.text}</p>
                    })
                }
            </div>
            <div className="chat-screen__form">
                <form action="POST">
                    <label className="send-message__label" htmlFor="messageToSend">
                        <input className="send-message__input-field" name="messageToSend" type="text"
                               onChange={(e) => setMessageToSend(e.target.value)}/>
                    </label>
                    <button type="button" className="chat-screen__send-button" onClick={handleSend}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatScreen;