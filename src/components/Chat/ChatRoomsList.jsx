import React from 'react';
import { useRooms } from '../../contexts/RoomsContextProvider';
import ChatRoomCard from './ChatRoomCard';
import CreateChatButton from './CreateChatButton';

function ChatRoomsList() {
  const currentUserId = localStorage.getItem('user_id');
  // const {
  //   data: rooms,
  //   error,
  //   isLoading,
  // } = useAPIRequest({
  //   url: `/user/${currentUserId}/conversation`,
  //   method: 'GET',
  // });
  const { rooms, error } = useRooms();


  if (error) return <div>Error: {error.message}</div>;
  
  if (rooms.length === 0)
    return (
      <>
        <div>No active room</div>
        <CreateChatButton />
      </>
    );

  return (
    <section className="chat-rooms-list__wrapper">
      {rooms.map((conversation) => (
        <ChatRoomCard
          key={conversation.id}
          currentUserId={currentUserId}
          conversation={conversation}
        />
      ))}
    </section>
  );
}

export default ChatRoomsList;
