// TODO: implement Bootstrap modal 
import React from 'react';
import PropTypes from 'prop-types';

function CreateChatButton({ showModal }) {

    return (
        <>
            <button className="create-chat__button" type="button" onClick={showModal}>
                Create chat
            </button>
        </>
    )
}

CreateChatButton.propTypes = {
    showModal: PropTypes.func
}

CreateChatButton.defaultProps = {
    showModal: null
}

export default CreateChatButton;