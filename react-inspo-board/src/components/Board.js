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
        <CardList boardId={props.id} />
      </span>
    </section>
  )
};

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired
};

export default Board;