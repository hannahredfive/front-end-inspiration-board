import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import CardList from './CardList';

const Board = (props) => {

  console.log('Props from Board', props)

  return (
    <section className='board'>
      {/* <h2>{props.currentBoard.title}</h2>
      <h3>{props.currentBoard.owner}</h3> */}
      <p>
        <span className='cardlist'>
          <CardList
            boardId={props.currentBoard.board_id}       
          />
        </span>
      </p>
    </section>
  )
};

Board.propTypes = {
  currentBoard: PropTypes.shape({
      board_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired
    })
};

export default Board;
