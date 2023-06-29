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
        setCardsData(response.data.cards);
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
        <CardList 
          cards={cardData}
        />
      </main>
    </div>
  );
}

export default App;
