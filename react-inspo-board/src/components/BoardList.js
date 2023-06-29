import React from 'react';
import PropTypes from 'prop-types';
import NewBoardForm from './NewBoardForm';
import './BoardList.css';

const BoardList = (props) => {
  const boards = props.boards;
  const getBoardListJSX = (boards) => {
    return boards.map((board) => {
      return (
        <button 
          id={board.id} 
          name='board'
          onClick={props.changeCurrentBoard(board.id)}
        >
          {board.title}
        </button>
      )
    });
  };

  return (
    <section>
      <span
        className="board__list bookmark__button">
          <button 
            id='new__board__toggle'
            onClick={props.newBoardFormToggle}
          >
            New Board +
          </button>
          {getBoardListJSX(boards)}
      </span>
      <NewBoardForm className='visble' />
    </section>
  )
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired
    })
  ).isRequired,
  changeCurrentBoard: PropTypes.func,
  newBoardFormToggle: PropTypes.func,
};

export default BoardList;