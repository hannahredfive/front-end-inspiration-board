import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import CardList from './CardList';

const Board = (props) => {
    return (
        <section>
            <CardList />
        </section>
    )
};

Board.propTypes = {

};

export default Board;