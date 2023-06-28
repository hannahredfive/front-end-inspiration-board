import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
// import NewCardForm from './NewBoardForm';
import './CardList.css';

// Reminder: Update props with {currentBoard, cards, incrementLikeCount, onDeleteCard, deleteBoard}
const CardList = (props) => {
    return (
        <section>
          {props.cardsData.map((card) => (
            <Card
              key={`${card.id}-${card.boardID}`}
              cardID={card.id}
            //   boardID={card.boardID}
              likeCount={card.likeCount}
              message={card.message}
              likeCard={props.likeCard}
              deleteCard={props.deleteCard}
            />
          ))}
        </section>
      );
    };

CardList.propTypes = {
    cardsData: PropTypes.arrayOf(
        PropTypes.shape({
            cardID: PropTypes.number,
            // boardID: PropTypes.number.isRequired,
            likeCount: PropTypes.number,
            message: PropTypes.string
        })
    )
};

export default CardList;