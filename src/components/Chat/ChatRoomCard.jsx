// TODO: change all 'conversation' to 'room'
import React from 'react';
import PropTypes from 'prop-types';
import {useRoom} from '../../contexts/RoomContextProvider';

function ChatRoomCard({room}) {
    const currentUserId = JSON.parse(localStorage.getItem('user_id'));
    const {setSelectedRoom} = useRoom();
    let roomName;

    if (!room.name) {
        const theOtherMember = room.members.filter((mem) => mem.id !== currentUserId)
        roomName = theOtherMember[0].name;
    } else {
        roomName = room.name;
    }

    function handleRoomChosen() {
        setSelectedRoom(room)
    }

    return (
        <>
            <button
                onClick={handleRoomChosen}
                className="chat-room__card"
                key={room.id}
                type="button"
            >
                <p className="chat-room__name">{roomName}</p>
                {room.last_message && (
                    <div className="chat-room-last-message__wrapper">
                        <p className="chat-room__last-message">{room.last_message.text}</p>
                    </div>
                )}
            </button>
        </>
    );
}

ChatRoomCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        members: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            })
        ),
        last_message: PropTypes.objectOf(
            PropTypes.shape({
                text: PropTypes.string,
                sent_at: PropTypes.string,
            })
        ),
    }),
};

ChatRoomCard.defaultProps = {
    room: null
};

export default ChatRoomCard;
