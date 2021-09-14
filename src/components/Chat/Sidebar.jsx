import React, {useState, useCallback} from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import {ChatRoomsList, CreateChatModal, CurrentUser} from "./Sidebar/index";

function Sidebar() {
    const [modalOpen, setModalOpen] = useState(false)

    const closeModal = useCallback(() => {
        setModalOpen(false)
    }, [])

    return (
        <section className="sidebar">
            <Container>
                <Row>
                    <Col>
                        <CurrentUser/>
                    </Col>
                    <Col>
                        <Button onClick={() => setModalOpen(true)} className="rounded-0 create-chat__button">
                            Create chat
                        </Button>
                        <Modal show={modalOpen} onHide={closeModal}>
                            <CreateChatModal closeModal={closeModal}/>
                        </Modal>
                    </Col>
                </Row>
            </Container>
            <ChatRoomsList/>
        </section>
    )
}

export default Sidebar;