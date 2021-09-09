import React from 'react';
import useAPIRequest from '../../hooks/useAPIRequest';
import ChatRoomCard from './ChatRoomCard';
import CreateChatButton from './CreateChatButton';

function ChatRoomsList() {
    const currentUserId = localStorage.getItem('user_id')
    const {data: conversations, error, isLoading} = useAPIRequest({
        url: `/user/${currentUserId}/conversation`,
        method: 'GET'
    });

    if (error) return <div>Error: {error.message}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (conversations.length === 0) return (
        <>
            <div>No active room</div>
            <CreateChatButton/>
        </>
    )

    return (
        <section className="chat-rooms-list__wrapper">
            {
                conversations.map((conversation) => (
                    <ChatRoomCard
                        key={conversation.id}
                        currentUserId={currentUserId}
                        conversation={conversation}
                    />
                ))
            }
        </section>
    )
}

export default ChatRoomsList;