/* eslint-disable no-unused-vars */
// import React from 'react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
// import NewCardForm from './NewBoardForm';
import './CardList.css';
import axios from 'axios';
import NewCardForm from './NewCardForm';


// Reminder to possibly props with {currentBoard, incrementLikeCount, deleteBoard}
// const CardList = (props) => {
//   return (
//     <div>
//       {props.cardData?.map((card) => (
//         <Card
//           // Reminder: Check with Hannah to see what board id prop is named.
//           key={card.cardId}
//           card={card}
//           // boardId={card.board_id}
//           likeCount={card.likes_count}
//           // message={card.message}
//           likeCard={props.likeCard} 
//           deleteCard={props.deleteCard}
//         />
//       ))}
//     </div>
//   );
// };
  
// CardList.propTypes = {
//     cardData: PropTypes.arrayOf(
//         PropTypes.shape({
//             cardId: PropTypes.number.isRequired,
//             // boardId: PropTypes.number.isRequired,
//             likeCount: PropTypes.number.isRequired,
//             message: PropTypes.string.isRequired,
//         })
//     ),
//     likeCard: PropTypes.func,
//     deleteCard: PropTypes.func
// };

const CardList = (props) => {

  console.log('Props', props.boardId)

  const URL_PREFIX = 'https://back-end-inspiration-board.onrender.com';
  const [cardData, setCardData] = useState([]);

  const getAllCards = () => {
    axios
      .get(`${URL_PREFIX}/boards/${props.boardId}/cards`)
      .then((response) => {
        setCardData(response.data);
      })
      .catch((error) => {
        console.log('getAllCards error:', error);
        alert('Unable to get cards for this board.');
      });
  };

  const likeCard = (cardId) => {
    axios
      .patch(`${URL_PREFIX}/cards/${cardId}`)
      .then((result) => {
        const newCards = [...cardData];
        for (const card of newCards) {
          if (card.id === cardId) {
            console.log(result);
            card.likes_count = result.data.likes_count;
          }
        }
        setCardData(newCards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  const addCard = (boardId, message) => {
    console.log(boardId, message)
    axios
      .post(`${URL_PREFIX}/boards/${boardId}/cards`, message)
      .then(() => {
        getAllCards();
      })
      .catch((error) => {
        console.log('addCard error:', error);
        alert('Unable to create a new card.');
      });
  };

  const deleteCard = (cardId) => {
    axios
      .delete(`${URL_PREFIX}/cards/${cardId}`)
      .then(() => {
        const newCards = cardData.filter((card) => card.id !== cardId);
        setCardData(newCards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  useEffect(() => {
    getAllCards(props.boardId);
  }, []);

  // useEffect(() => {
  //   console.log(currentBoard);
  //   if (currentBoard.id) {
  //     getAllCards(currentBoard.id);
  //   }
  // }, []);

  console.log('inside CardList', cardData)

  return (
    <section>
      <div>
        {cardData.map((card) => (
          <Card
            key={card.card_id}
            card={card}
            likeCard={likeCard}
            deleteCard={deleteCard} 
          />
        ))}
      </div>
      <div>
      {console.log('CardList JSX level', props.boardId)}
        <NewCardForm 
          addCard={addCard}
          boardId={props.boardId}
        /> 
      </div>
    </section>
  );
};

// CardList.propTypes = {
//   currentBoard: PropTypes.object.isRequired
// };



export default CardList;