import React from 'react';
import { useRooms } from '../../contexts/RoomsContextProvider';
import ChatRoomCard from './ChatRoomCard';
import CreateChatButton from './CreateChatButton';

function ChatRoomsList() {
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
          room={conversation}
        />
      ))}
    </section>
  );
}

export default ChatRoomsList;
