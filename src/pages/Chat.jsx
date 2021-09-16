import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Sidebar, ChatScreen } from '../components';
import { RoomContextProvider } from '../contexts/RoomContextProvider';
import { RoomsContextProvider } from '../contexts/RoomsContextProvider';

function Chat() {
  return (
    <main>
      <section className="chat__wrapper h-100">
        <RoomsContextProvider>
          <RoomContextProvider>
            <Row className="h-100 p-md-5">
              <Col className="h-100" md={5} lg={4} xl={3}>
                <Sidebar />
              </Col>
              <Col className="h-100" md={7} lg={8} xl={9}>
                <ChatScreen />
              </Col>
            </Row>
          </RoomContextProvider>
        </RoomsContextProvider>
      </section>
    </main>
  );
}

export default Chat;
