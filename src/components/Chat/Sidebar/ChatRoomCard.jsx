// TODO: change all 'conversation' to 'room'
import React from 'react';
import PropTypes from 'prop-types';

function ChatRoomCard({room}) {
    const currentUserId = JSON.parse(localStorage.getItem('user_id'));
    let roomName;

    if (!room.name) {
        const theOtherMember = room.members.filter((mem) => mem.id !== currentUserId)
        roomName = theOtherMember[0].name;
    } else {
        roomName = room.name;
    }

    return (
        <>
            <div className="chat-room__card overflow-hidden">
                <p className="chat-room__name">{roomName}</p>
                {room.last_message && (
                    <div className="chat-room-last-message__wrapper">
                        <p className="chat-room__last-message">{room.last_message.text}</p>
                    </div>
                )}
            </div>
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
