// TODO: auto update the messages when new messages are added
// TODO: style the messages better, now it overflows
import React, {useContext, useState} from 'react';
import axios from 'axios';
import {RoomContext} from '../../contexts/RoomContextProvider';

function ChatScreen() {
    const currentUserId = localStorage.getItem('user_id');
    const conversationId = localStorage.getItem('room_id');
    const messages = useContext(RoomContext);
    const [messageToSend, setMessageToSend] = useState('');

    function sendMessage() {
        if(messageToSend === '') return
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BUNQ_API_BASE_URL}/user/${currentUserId}/conversation/${conversationId}/message`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_BUNQ_API_TOKEN}`,
            },
            data: {
                "text": messageToSend
            }
        })
    }

    if(messages === null) return (
        <div className="chat-screen__no-messages">
            <p>No active messages. Please enter a room!</p>
        </div>
    )

    return (
        <div className="chat-screen__wrapper">
            <p className="chat-room__name">{localStorage.getItem('room_name')}</p>
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
                    <button type="button" className="chat-screen__send-button" onClick={sendMessage}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatScreen;