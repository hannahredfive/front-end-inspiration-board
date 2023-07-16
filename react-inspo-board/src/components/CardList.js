/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
// import NewCardForm from './NewBoardForm';
import './CardList.css';


// Reminder to possibly props with {currentBoard, incrementLikeCount, deleteBoard}
const CardList = (props) => {
  return (
    <div>
      {props.cardData?.map((card) => (
        <Card
          // Reminder: Check with Hannah to see what board id prop is named.
          // key={`${card.id}-${card.board_id}`}
          cardId={ card.id }
          boardId={card.board_id}
          likeCount={ card.likes_count }
          message={ card.message }
          likeCard={ props.likeCard } 
          deleteCard={ props.deleteCard }
        />
      ))}
    </div>
  );
};
  
CardList.propTypes = {
    cardData: PropTypes.arrayOf(
        PropTypes.shape({
            cardId: PropTypes.number.isRequired,
            boardId: PropTypes.number.isRequired,
            likeCount: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
        })
    ),
    likeCard: PropTypes.func,
    deleteCard: PropTypes.func
};

export default CardList;