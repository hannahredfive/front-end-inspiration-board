import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';


const Card = (props) => {

    const onClickLikeButton () => {
        console.log('Like Button working')
        props.onClickCallback(props.id);
    };

    return (
        <section>
            <p>'blah!'</p>
        </section>
    )
};

export default Card;