// TODO: auto update the messages when new messages are added
// TODO: style the messages better, now it overflows
import React, { useState } from 'react';
import { useRoom } from '../../contexts/RoomContextProvider';

function ChatScreen() {
    const { messages, error, selectedRoom, sendMessage } = useRoom();
    const currentUserId = JSON.parse(localStorage.getItem('user_id'));
    const [messageToSend, setMessageToSend] = useState('');
    let roomName;

    if(!selectedRoom) return <p>No room selected. Please enter one!</p>

    if (!selectedRoom.name) {
        const theOtherMember = selectedRoom.members.filter((mem) => mem.id !== currentUserId)
        roomName = theOtherMember[0].name;
    } else {
        roomName = selectedRoom.name;
    }

    function handleSend(e) {
        e.preventDefault();
        if(messageToSend) {
            sendMessage(messageToSend);
            setMessageToSend('');
        }
    }

    if(!messages) return (
        <div className="chat-screen__no-messages">
            <p>No active messages. Please enter a room!</p>
        </div>
    )

    if(error) return <p className="error__message">{error}</p>

    return (
        <div className="chat-screen__wrapper">
            <p className="chat-room__name">{roomName}</p>
            <div className="chat-screen__messages">
                {
                    [...messages].reverse().map((message) => {
                        if (message.user_id === currentUserId) return <p key={message.id} className="user_message">{message.text}</p>
                        return <p key={message.id} className="member_message">{message.text}</p>
                    })
                }
            </div>
            <div className="chat-screen__form">
                <form action="POST">
                    <label className="send-message__label" htmlFor="messageToSend">
                        <input className="send-message__input-field" name="messageToSend" type="text" value={messageToSend}
                               onChange={(e) => setMessageToSend(e.target.value)}/>
                    </label>
                    <button type="submit" className="chat-screen__send-button" onClick={handleSend}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatScreen;