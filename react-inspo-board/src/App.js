import React, { useState, useEffect } from 'react';
import CardList from './components/CardList.js';
import BoardList from './components/BoardList.js';
import './App.css';
import axios, {isCancel, AxiosError} from 'axios';


function App() {

  // const [cardData, setCardData] = useState([
  //   {
  //     id: 1,
  //     message: 'message 1'
  //   },
  //   {
  //     id: 2,
  //     message: 'message 2'
  //   },
  //   {
  //     id: 3,
  //     message: 'message 3'
  //   }
  // ]);

  const [cardData, setCardData] = useState([]);

  //Get API calls from axios for rendering all cards
  const getAllCards = (boardId) => {
    axios
      .get(`URL/boards/${boardId}/cards`)
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
      .patch(`URL/cards/${cardId}/like`)
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
        // `URL/boards/${selectedBoard.board_id}/cards`,
        { message }
      )
      .then((result) => {
        console.log(result);
        const newCard = {
          id: result.data.card.id,
          message: result.data.card.message,
          likes_count: result.data.card.likes_count,
          // boardId: result.data.card.board_id,
        };
        setCardData([...cardData, newCard], () => {
          console.log(this.state.cardsData);
        });
      })
      .catch((error) => console.log(error.response.data));
  };

  const deleteCard = (cardId) => {
    axios
      .delete(`URL/cards/${cardId}`)
      .then(() => {
        const newCards = cardData.filter((card) => card.id !== cardId);
        setCardData(newCards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  return (
    <div>
      <header>
        <h1>Inspo Board</h1>
        <h2>Board Description!</h2>
      </header>
      <main>
        <BoardList />
        {/* CardList in JSX only for testing purposes */}
        {/* Reminder: Delete CardList and move content inside there up to BoardList */}
        {/* once that component has been established */}
        <CardList 
          cards={cardData}
          likeCard={likeCard}
          deleteCard={deleteCard}
        />
      </main>
    </div>
  );
}

export default App;
