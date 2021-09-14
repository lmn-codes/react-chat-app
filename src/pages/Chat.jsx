// TODO: implement bootstrap modal for create chat modal
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {
    Sidebar,
    ChatScreen,
} from '../components';
import {RoomContextProvider} from '../contexts/RoomContextProvider';
import {RoomsContextProvider} from '../contexts/RoomsContextProvider';

function Chat() {
    return (
        <main>
            <section className="chat__wrapper h-100">
                <RoomsContextProvider>
                    <RoomContextProvider>
                        <Container className="h-100">
                            <Row>
                                <Col md={3}><Sidebar/></Col>
                                <Col md={9}><ChatScreen/></Col>
                            </Row>
                        </Container>
                    </RoomContextProvider>
                </RoomsContextProvider>
            </section>
        </main>
    );
}

export default Chat;
