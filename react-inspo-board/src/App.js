import React, { useState, useEffect } from 'react';
import './App.css';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';
import axios, {isCancel, AxiosError} from 'axios';

function App() {
  const URL_PREFIX = 'URL_TBD';
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

  const getBoardListJSX = () => {
    return boards.map((board) => {
      return (
        <button 
          id={board.id} 
          name='board'
          onClick={changeCurrentBoard(board.id)}
        >
          {board.title}
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
          />
        </section>
      </main>
    </div>
  );
}

export default App;
