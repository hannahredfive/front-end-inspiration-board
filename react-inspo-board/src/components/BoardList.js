import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import NewBoardForm from './NewBoardForm';
import './BoardList.css';
import CardList from './CardList';

const BoardList = (props) => {
    return (
        <section>
            <Board />
            <NewBoardForm />
        </section>
    )
};

BoardList.propTypes = {

};

export default BoardList;