import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './CardList.css';
import axios from 'axios';
import NewCardForm from './NewCardForm';


const CardList = (props) => {

  console.log('Props', props.boardId)

  const URL_PREFIX = 'https://back-end-inspiration-board.onrender.com';
  const [cardData, setCardData] = useState([]);

  const getAllCards = () => {
    console.log('BoardId First Line GetAllCards', props.boardId);
    if (props.boardId > 0) {
      axios
      .get(`${URL_PREFIX}/boards/${props.boardId}/cards`)
      .then((response) => {
        console.log('All Responses', response, response.data, response.data.cards)
        setCardData(response.data.cards);
      })
      .catch((error) => {
        console.log('getAllCards error:', error);
        alert('Unable to get cards for this board.');
      })
    };
  };

  useEffect(() => {
    getAllCards();
  }, [props.boardId]);

  
  const likeCardCount = (boardId, newCard) => {
    // Patch is for liking a card
    axios
      .patch(`${URL_PREFIX}/boards/${boardId}/cards/${newCard.card_id}`)
      .then(() => {
        const newCardsData = cardData.map((card) => {
          if (card.card_id !== newCard.card_id) {
            return card;
          };
          return {...newCard, likes_count: newCard.likes_count + 1};
        });
        setCardData(newCardsData);
      })
      .catch((error) => {
        console.log('likeCardCount error:', error);
        alert('Unable to like the card.');
      });
  };

  const disLikeCardCount = (boardId, newCard) => {
    // Put is for disliking a card
    axios
      .put(`${URL_PREFIX}/boards/${boardId}/cards/${newCard.card_id}`)
      .then(() => {
        const newCardsData = cardData.map((card) => {
          if (card.card_id !== newCard.card_id) {
            return card;
          };
          return {...newCard, likes_count: newCard.likes_count - 1};
        });
        setCardData(newCardsData);
      })
      .catch((error) => {
        console.log('likeCardCount error:', error);
        alert('Unable to like the card.');
      });
  };

  const addCard = (boardId, newCard) => {
    console.log(boardId, newCard)
    axios
      .post(`${URL_PREFIX}/boards/${boardId}/cards`, newCard)
      .then(() => {
        getAllCards();
      })
      .catch((error) => {
        console.log('addCard error:', error);
        alert('Unable to create a new card.');
      });
  };

  const deleteCard = (boardId, card) => {
    axios
      .delete(`${URL_PREFIX}/boards/${boardId}/cards/${card.card_id}`)
      .then(() => {
        getAllCards();
      })
      .catch((error) => {
        console.log('deleteCard error:', error);
        alert('Unable to delete the card.');
      });
  };

  return (
    <section >
      <div className='cardform'>
        <section>
        {console.log('CardList JSX level', props.boardId)}
        {!!props.boardId && 
          <NewCardForm 
            addCard={addCard}
            boardId={props.boardId}
          /> 
        }
        </section>
      </div>
      <div className='card-list-container'>
        {console.log('Inside cardData', cardData)}
        {cardData.map((card) => (
          <Card
            key={card.card_id}
            card={card}
            likeCardCount={likeCardCount}
            disLikeCardCount={disLikeCardCount}
            deleteCard={deleteCard}
            boardId={props.boardId} 
          />
        ))}
      </div>
      <footer>
        <p>Made with love by Team Fluffybutt, last updated July 2023.</p>
        <p>Copyright © 2023 Kathleen, Sel, Hannah,  and Linh. All rights reserved.</p>
      </footer>
    </section>
  );
};

CardList.propTypes = {
  boardId: PropTypes.number.isRequired
};

export default CardList;