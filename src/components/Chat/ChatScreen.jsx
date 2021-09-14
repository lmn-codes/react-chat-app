import React, {useState} from 'react';
import {useRoom} from '../../contexts/RoomContextProvider';

function ChatScreen() {
    const {messages, error, selectedRoom, sendMessage} = useRoom();
    const currentUserId = JSON.parse(localStorage.getItem('user_id'));
    const [messageToSend, setMessageToSend] = useState('');
    let roomName;

    if (!selectedRoom) return <section className="wrapper__empty"><p>No room selected. Please enter one!</p></section>

    if (!selectedRoom.name) {
        const theOtherMember = selectedRoom.members.filter((mem) => mem.id !== currentUserId)
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

    if (error) return <p className="error__message">{error}</p>

    return (
        <section className="chat-screen d-flex flex-column flex-grow-1">
            <p className="chat-room__name">{roomName}</p>
            <div className={messages.length > 0 ? `chat-screen__messages` : `wrapper__empty`}>
                <div
                    className="chat-screen__messages-list d-flex flex-column align-items-start justify-content-end px-3">
                    {
                        [...messages].reverse().map((message) => {
                            if (message.user_id === currentUserId) {
                                return (
                                    <p key={message.id} className="user_message align-self-end align-items-end">
                                        {message.text}
                                    </p>
                                )
                            }

                            return <p key={message.id} className="member_message align-items-start">{message.text}</p>
                        })
                        }
                        </div>
                        </div>
                        <div className="chat-screen__form">
                        <form action="POST">
                        <label className="send-message__label" htmlFor="messageToSend">
                        <input className="send-message__input-field" name="messageToSend" type="text"
                        value={messageToSend}
                        onChange={(e) => setMessageToSend(e.target.value)}/>
                        </label>
                        <button type="submit" className="chat-screen__send-button" onClick={handleSend}>
                        Send
                        </button>
                        </form>
                        </div>
                        </section>
                        )
                    }

                    export default ChatScreen;