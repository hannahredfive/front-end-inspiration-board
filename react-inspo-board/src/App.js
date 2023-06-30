import React, { useState, useEffect } from 'react';
import './App.css';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';
import axios, {isCancel, AxiosError} from 'axios';


function App() {
  const URL_PREFIX = 'https://back-end-inspiration-board.onrender.com';
  const [cardData, setCardData] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({
    id: 0,
    title: '',
    owner: ''
  });
  const [boards, setBoards] = useState([
    {
      id: 0,
      title: '',
      owner: ''
    }
  ]);
  const [showHide, setShowHide] = useState('+')

  const loadBoards = () => {
    axios
      .get(`${URL_PREFIX}/boards`)
      .then((response) => {
        const initialBoardData = [];
        response.data.forEach((board) => {
          initialBoardData.push(board);
        });
        setBoards(initialBoardData);
      })
      .catch((error) => {
        console.log('Could not load boards from the database', error);
      });
  };

  useEffect( () => {
    loadBoards();
  }, []);

  const changeCurrentBoard = (boardId) => {
    boards.forEach(board => {
      if (board.id === boardId) {
        setCurrentBoard(board);
      }
    })
  };

  const newBoardFormToggle = () => {
    if (showHide === '+') {
      setShowHide('-');
    } else {
      setShowHide('+');
    }
  };

  const createNewBoard = (newBoardInfo) => {
    const updateNewBoardInfo = {
      ...newBoardInfo
    };

    axios
      .post(`${URL_PREFIX}/boards`, updateNewBoardInfo)
      .then(() => {
        // update the Boards state to refresh the page
        const newBoardsArray = [...boards];
        newBoardsArray.push(newBoardInfo);
        setBoards(newBoardsArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }; 

  //Get API calls from axios for rendering all cards
  const getAllCards = (boardId) => {
    axios
      .get(`${URL_PREFIX}/boards/${boardId}/cards`)
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
        `${URL_PREFIX}/boards/${currentBoard.board_id}/cards`,
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

  // Can we make some of this code dryer? 
  // By collapsing together and adding conditionals to ID card vs board
  const deleteBoard = (boardId) => {
    axios
      .delete(`${URL_PREFIX}/boards/${boardId}`)
      .then(() => {
        const newBoards = boards.filter((board) => board.id !== boardId);
        setBoards(newBoards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
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

  const getBoardListJSX = () => {
    return boards.map((board) => {
      return (
        <button 
        id={board.id} 
        name='board'
        onClick={changeCurrentBoard(board.id)}
        >
          {board.title}
          <button
            id={board.id}
            name='trash'
            onClick={deleteBoard(board.id)}
          >
            🗑️
          </button>
        </button>
      )
    });
  };

  return (
    <div>
      <header>
      <span
        className="board__list bookmark__button">
          <button 
            id='new__board__toggle'
            onClick={newBoardFormToggle}
          >
            New Board {showHide}
          </button>
          {getBoardListJSX}
      </span>
      </header>
      <main>
        <section className='left'>
          <NewBoardForm 
            showHide={showHide} 
            createNewBoard={createNewBoard} 
          />
        </section>
        <section className='right'>
          <h1>Inspo Board</h1>
          <h2>Board Description!</h2>
        </section>
        <section>
          <Board 
            currentBoard={currentBoard}
            getAllCards={getAllCards}
            addCard={addCard}
            deleteCard={deleteCard}
            likeCard={likeCard}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
