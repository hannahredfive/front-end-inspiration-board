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
        addCard(boardId, cardFormData);
        setCardFormData({
            message: "",
        });
    };

    return (
        <section>
            <div className="new-card-form">
                <h3>Create New Post-it Note</h3>
                <form className='form-container' onSubmit={handleFormSubmit}>
                    <label htmlFor='message'>Message:</label>
                    <input className='input-field'
                        name="message"
                        type="text"
                        value={cardFormData.message}
                        onChange={handleMessageChange}
                    />
                    <input className='form-button' type="submit" value='Post'></input>
                </form>
            </div>
        </section>
    );
};

NewCardForm.propTypes = {
    addCard: PropTypes.func.isRequired,
    boardId: PropTypes.number.isRequired
};

export default NewCardForm;