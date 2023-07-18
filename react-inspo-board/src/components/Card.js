import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ card, likeCard, deleteCard }) => {

    return (
        <section>
            <p>{card.message}</p>
            <div>
                <button onClick={likeCard(card)}>
                    {card.likeCard ? '❤️' : '🤍'}
                </button>
                {/* <p>{likeCount}</p> */}
                <button onClick={deleteCard(card)}>
                    Delete Card
                </button>
            </div>
        </section>
    )
};

Card.propTypes = {
    card: PropTypes.shape({
        card_id: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        likes_count: PropTypes.number.isRequired
    }),
    likeCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired
};

export default Card;