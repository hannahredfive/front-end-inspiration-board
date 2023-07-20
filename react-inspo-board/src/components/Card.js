import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ card, likeCardCount, disLikeCardCount, deleteCard, boardId }) => {
    console.log('Card boardId', boardId);
    return (
        <section class="cards-container">
            <div class="card-item">
            <p>{card.message}</p>
            <div class="card-icons-container">
                <button onClick={() => likeCardCount(boardId, card)}>
                    + ❤️
                    {/* {card.likes_count ? '+ ❤️' : '🖤'} */}
                </button>
                {card.likes_count}
                <button onClick={() => disLikeCardCount(boardId, card)}>
                    🖤 -
                </button>
                <button onClick={() => deleteCard(boardId, card)}>
                    ❌
                </button>
            </div>
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
    likeCardCount: PropTypes.func.isRequired,
    disLikeCardCount: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    boardId: PropTypes.number.isRequired
};

export default Card;