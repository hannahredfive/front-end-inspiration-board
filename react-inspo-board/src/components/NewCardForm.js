import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

const NewCardForm = ({ addCard, boardId }) => {
    const [cardFormData, setCardFormData] = useState({
        message: "",
    });

    const handleMessageChange = (event) => {
        setCardFormData({ ...cardFormData, message: event.target.value });
    };
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('NewCardForm level', boardId)
        addCard(boardId, cardFormData.message);
        setCardFormData({
            message: "",
        });
    };

    return (
        <section>
            <h3>Create New Post-it Note</h3>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="message">Message:</label>
                <input
                    name="message"
                    type="text"
                    value={cardFormData.message}
                    onChange={handleMessageChange}
                />
                <button type="submit">Post</button>
            </form>
        </section>
    );
};

NewCardForm.propTypes = {
    addCard: PropTypes.func.isRequired
};

export default NewCardForm;