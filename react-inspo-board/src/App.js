import React, { useState, useEffect } from 'react';
import './App.css';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';
import axios, {isCancel, AxiosError} from 'axios';


function App() {
  const URL_PREFIX = 'https://back-end-inspiration-board.onrender.com';
  const [boards, setBoards] = useState([
    {
      board_id: 0,
      title: '',
      owner: ''
    }
  ]);
  const [currentBoard, setCurrentBoard] = useState({
    board_id: 0,
    title: '',
    owner: ''
  });
  const [showHide, setShowHide] = useState(false)

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
    console.log("???");
    boards.forEach(board => {
      if (board.board_id === boardId) {
        setCurrentBoard(board);
        console.log(board)
      }
    })
  };

  const newBoardFormToggle = () => {
    if (showHide === true) {
      setShowHide(false);
    } else {
      setShowHide(true);
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
        loadBoards();
      })
      .catch((error) => {
        console.log(error);
      });
  }; 

  const deleteBoard = (boardId) => {
    axios
      .delete(`${URL_PREFIX}/boards/${boardId}`)
      .then(() => {
        const newBoards = boards.filter((board) => board.board_id !== boardId);
        setBoards(newBoards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };


  const getBoardListJSX = () => {
    return boards.map((board) => {
      if (board.board_id !== 0) {
        return (
          <span key={board.board_id}>
            <button className="board-buttons"
            id={board.board_id} 
            name='board'
            onClick={() => changeCurrentBoard(board.board_id)}
            >
              {board.title}
            </button>
            <button className="trash-buttons"
              id={board.board_id}
              name='trash'
              onClick={() => deleteBoard(board.board_id)}
            >
              🗑️
            </button>
          </span>
        )
      }
    });
  };

  console.log('App JSX level', currentBoard)

  return (
    <div className="webpage-border">
      <section className="title-container">
        <h1 className="animated-title">{currentBoard.owner}{currentBoard.owner ? "'S" : ''} INSPIRATION BOARD</h1>
      </section>
      <span className="board-container">
          <div className="board-list">
            <button className="new-board-button"
              id='new__board__toggle'
              onClick={newBoardFormToggle}
            >
              New Board {showHide ? '-': '+'}
            </button>
            {getBoardListJSX()}
          </div>
      </span>
      <main>
          {showHide && 
            <section>
              <NewBoardForm 
                showHide={showHide} 
                createNewBoard={createNewBoard} 
                />
            </section>
          }
        <section>
          <Board 
            currentBoard={currentBoard}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
