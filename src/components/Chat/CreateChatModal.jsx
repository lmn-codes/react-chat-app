// TODO: fix the reload problem 
import React, {useContext, useState} from 'react';
// import axios from 'axios';
import {UsersContext} from '../../contexts/UsersContextProvider';
import { useRooms } from '../../contexts/RoomsContextProvider';

function CreateChatModal() {
    const users = useContext(UsersContext);
    const currentUserId = localStorage.getItem('user_id')
    const usersToAdd = users.filter(user => user.id !== parseInt(currentUserId, 10));
    const [members, setMembers] = useState([]);
    const [roomName, setRoomName] = useState('')
    const { createRoom } = useRooms();

    function handleUserChosen(id) {
        let newArray = [];
        // if user is already in the list, remove them
        if (members.includes(id)) {
            newArray = members.filter(member => member !== id);
        } else {
            newArray = [...members, id]
        }
        setMembers(newArray);
    }

    function handleCreateRoom() {
        createRoom(members, roomName);
    }

    return (
        <section className="create-chat__modal__wrapper">
            <div className="create-chat__modal">
                <div className="create-chat__users__wrapper">
                    {
                        usersToAdd.map(user => (
                            <button
                                className={members.includes(user.id) ? "users-to-add__button__selected" : "users-to-add__button"}
                                type="button"
                                key={user.id}
                                onClick={() => {
                                    handleUserChosen(user.id)
                                }}>
                                {user.name}
                            </button>
                        ))
                    }
                </div>
                    {
                        members.length > 1 && (
                            <form>
                                <label className="room-name__label" htmlFor="Room name">
                                    Room name
                                    <input className="room-name__input" type="text" required onChange={(e) => setRoomName(e.target.value)}/>
                                </label>
                            </form>
                        )
                    }

                <button className="create-room__button" type="button" onClick={handleCreateRoom}>Create Room</button>
            </div>
        </section>
    )
}

export default CreateChatModal;