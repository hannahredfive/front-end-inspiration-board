import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ card, likeCardCount, deleteCard }) => {

    return (
        <section>
            <p>{card.message}</p>
            <div>
                <button onClick={likeCardCount(card)}>
                    {card.likes_count ? '❤️' : '🤍'}
                </button>
                {/* <p>{likeCount}</p> */}
                <button onClick={deleteCard(card)}>
                    🆇
                </button>
            </div>
        </section>
    )
};

Card.propTypes = {
    card: PropTypes.shape({
        board_id: PropTypes.number.isRequired,
        card_id: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        likes_count: PropTypes.number.isRequired
    }),
    likeCardCount: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired
};

export default Card;