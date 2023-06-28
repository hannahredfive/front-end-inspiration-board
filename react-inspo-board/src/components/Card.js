import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';


const Card = (props) => {

    const onLikeCard = () => {
        console.log('Card like toggle working');
        props.likeCard(props.cardID);
    };

    const onDeleteCard = () => {
        console.log('Card deleted properly');
        props.deleteCardCallback(props.cardID);
    };

    return (
        <section>
            <p>{props.message}</p>
            <div>
                <button onClick={onLikeCard}>
                    {props.likeCard ? '❤️' : '🤍'}
                </button>
                {/* <p>{likeCount}</p> */}
                <button onClick={onDeleteCard}>
                    Delete Card
                </button>
            </div>
        </section>
    )
};

Card.propTypes = {
    cardID: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likeCard: PropTypes.func.isRequired,
    // likeCount: PropTypes.number.isRequired,
    deleteCard: PropTypes.func.isRequired
};

export default Card;