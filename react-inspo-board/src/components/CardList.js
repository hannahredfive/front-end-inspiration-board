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
      {props.cardData.map((card) => (
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

// const cards = [
//     {
//       id: 1,
//       message: 'message 1',
//     },
//     {
//       id: 2,
//       message: 'message 2',
//     },
//   ];
  
// // Reminder to possibly props with {currentBoard, incrementLikeCount, deleteBoard}
// const CardList = ({ cards, likeCard, deleteCard }) => {

//     const getCardList = (cards) => {
//         return cards.map((card) => {
//             return (
//                 <Card
//                 key={card.id}
//                 // Reminder: Check with Hannah to see what board id prop is named.
//                 //   key={`${card.id}, ${card.boardID}`}
//                 cardID={card.id}
//                 //   boardID={card.boardID}
//                 likeCount={card.likeCount}
//                 message={card.message}
//                 likeCard={likeCard}
//                 deleteCard={deleteCard}
//                 />
//             )
//         })
//     }
//         // return <section>{getCardList(cards)}</section>   
//         // return (<section>{getCardList(cards)}</section>)
//         return (<section>Why?</section>)
// };

// CardList.propTypes = {
//     cards: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             // boardID: PropTypes.number.isRequired,
//             likeCount: PropTypes.number.isRequired,
//             message: PropTypes.string.isRequired
//         })
//     ).isRequired,
//     likeCard: PropTypes.func.isRequired,
//     deleteCard: PropTypes.func.isRequired
// };

export default CardList;