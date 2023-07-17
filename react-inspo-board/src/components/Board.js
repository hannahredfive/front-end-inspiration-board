import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import CardList from './CardList';
import axios from 'axios';
import NewCardForm from './NewCardForm';

const Board = (props) => {

  const URL_PREFIX = 'https://back-end-inspiration-board.onrender.com';
  const [cardData, setCardData] = useState([]);

  //Get API calls from axios for rendering all cards
  const getAllCards = (boardId) => {
    axios
      .get(`${URL_PREFIX}/boards/${props.currentBoard.id}/cards`)
      .then((response) => {
        console.log(response.data);
        setCardData(response.data.cards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
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

  // Reminder: Check with Hannah regarding name of board id and select board *object* function
  const addCard = (message) => {
    axios
      .post(
        `${URL_PREFIX}/boards/${props.currentBoard.id}/cards`,
        { message }
      )
      .then((result) => {
        console.log(result);
        const newCard = {
          id: result.data.card.id,
          message: result.data.card.message,
          likes_count: result.data.card.likes_count,
          boardId: props.currentBoard.id,
        };
        setCardData([...cardData, newCard], () => {
          console.log(this.state.cardsData);
        });
      })
      .catch((error) => console.log(error.response.data));
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
    console.log(props.currentBoard);
    if (props.currentBoard.id) {
      getAllCards(props.currentBoard.id);
    }
  }, []);

  return (
    <section>
      <h2>{props.currentBoard.title}</h2>
      <h4>{props.currentBoard.owner}</h4>
      <span className='card__list'>
        <CardList 
          boardId={props.currentBoard.id} 
          cards={cardData}
          // getAllCardsProp={props.getAllCards}
          // addCardProp={props.addCard}
          // deleteCardProp={props.deleteCard}
          // likeCardProp={props.likeCard}
          getAllCards={getAllCards}
          addCard={addCard}
          deleteCard={deleteCard}
          likeCard={likeCard}
        />
      </span>
      <NewCardForm addCard={props.addCard}/>
    </section>
  )
};

Board.propTypes = {
  currentBoard: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired
    }),
  deleteBoard: PropTypes.func.isRequired
  // getAllCards: PropTypes.func.isRequired,
  // addCard: PropTypes.func.isRequired,
  // deleteCard: PropTypes.func.isRequired,
  // likeCard: PropTypes.func.isRequired,
};

export default Board;