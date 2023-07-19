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

  // const getAllCards = () => {
  //   if (props.boardId > 0) {
  //     axios
  //     .get(`${URL_PREFIX}/boards/${props.boardId}/cards`)
  //     .then((response) => {
  //       console.log('All Responses', response, response.data, response.data.cards)
  //       setCardData(response.data.cards);
  //     })
  //     .catch((error) => {
  //       console.log('getAllCards error:', error);
  //       alert('Unable to get cards for this board.');
  //     })
  //   };
  // };

  // useEffect(() => {
  //   getAllCards(props.boardId);
  // }, []);
  
  const likeCardCount = (newCard) => {
    axios
      .put(`${URL_PREFIX}/cards/${newCard.card_id}`)
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

  // const likeCard = (cardId) => {
  //   axios
  //     .patch(`${URL_PREFIX}/cards/${cardId}`)
  //     .then((result) => {
  //       const newCards = [...cardData];
  //       for (const card of newCards) {
  //         if (card.id === cardId) {
  //           console.log(result);
  //           card.likes_count = result.data.likes_count;
  //         }
  //       }
  //       setCardData(newCards);
  //     })
  //     .catch((error) => {
  //       console.error('likeCard error:', error);
  //     });
  // };

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

  // const addCard = (boardId, message) => {
  //   console.log(boardId, message)
  //   axios
  //     .post(`${URL_PREFIX}/boards/${boardId}/cards`, message)
  //     .then(() => {
  //       getAllCards();
  //     })
  //     .catch((error) => {
  //       console.log('addCard error:', error);
  //       alert('Unable to create a new card.');
  //     });
  // };

  const deleteCard = (card) => {
    axios
      .delete(`${URL_PREFIX}/cards/${card.card_id}`)
      .then(() => {
        getAllCards();
      })
      .catch((error) => {
        console.log('deleteCard error:', error);
        alert('Unable to delete the card.');
      });
  };

  // const deleteCard = (cardId) => {
  //   axios
  //     .delete(`${URL_PREFIX}/cards/${cardId}`)
  //     .then(() => {
  //       const newCards = cardData.filter((card) => card.id !== cardId);
  //       setCardData(newCards);
  //     })
  //     .catch((error) => {
  //       console.error('deleteCard error:', error);
  //     });
  // };

  // console.log('inside CardList', cardData)

  return (
    <section>
      <div>
        {console.log('Inside cardData', cardData)}
        {cardData.map((card) => (
          <Card
            key={card.card_id}
            card={card}
            likeCardCount={likeCardCount}
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

CardList.propTypes = {
  boardId: PropTypes.number.isRequired
};

export default CardList;