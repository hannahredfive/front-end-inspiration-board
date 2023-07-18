import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import CardList from './CardList';

const Board = (props) => {

  console.log('Props from Board', props)

  return (
    <section>
      <h2>{props.currentBoard.title}</h2>
      <h4>{props.currentBoard.owner}</h4>
      <span className='card__list'>
        {console.log('Board JSX level', props.currentBoard.board_id)}
        <CardList
          boardId={props.currentBoard.board_id}       
        />
      </span>
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
