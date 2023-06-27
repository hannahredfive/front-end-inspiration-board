import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import NewCardForm from './NewBoardForm';
import './CardList.css';

const CardList = (props) => {
    return (
        <section>
            <Card />
            <NewCardForm />
        </section>
    )
};

CardList.propTypes = {

};

export default CardList;