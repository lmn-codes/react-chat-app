import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import {useRooms} from '../../../contexts/RoomsContextProvider';
import ChatRoomCard from './ChatRoomCard';
import {useRoom} from "../../../contexts/RoomContextProvider";

function ChatRoomsList() {
    const [activeRoom, setActiveRoom] = useState(null);
    const { rooms, error } = useRooms();
    const { setSelectedRoom } = useRoom();

    if (error) return <div>Error: {error.message}</div>;

    if (rooms.length === 0)
        return (
            <>
                <div className="wrapper__empty">No active room. Please create one.</div>
            </>
        );

    function handleRoomChosen(room) {
        setSelectedRoom(room);
        setActiveRoom(room.id);
    }

    return (
        <div className="chat-rooms-list__wrapper w-100">
            <ListGroup className="chat-rooms-list">
                {rooms.map((r) => (
                    <ListGroup.Item
                        action
                        key={r.id}
                        onClick={() => handleRoomChosen(r)}
                        active={r.id === activeRoom}
                    >
                        <ChatRoomCard
                            room={r}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default ChatRoomsList;
