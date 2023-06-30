import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import CardList from './CardList';

const Board = (props) => {
  return (
    <section>
      <h2>{props.title}</h2>
      <h4>{props.owner}</h4>
      <span className='card__list'>
        <CardList 
          boardId={props.id} 
          getAllCards={props.getAllCards}
          addCard={props.addCard}
          deleteCard={props.deleteCard}
          likeCard={props.likeCard}
        />
      </span>
    </section>
  )
};

Board.propTypes = {
  board: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired
    }),
  getAllCards: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  likeCard: PropTypes.func.isRequired,
};
// Need to add a delete function in here!

export default Board;