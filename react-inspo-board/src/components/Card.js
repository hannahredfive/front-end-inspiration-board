import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';


const Card = (props) => {

    const onClickLikeButton () => {
        console.log('Like Button working')
        props.onClickCallback(props.id);
    };

    const deleteCard = () => {
        console.log('Card deleted properly')
        props.deleteCardCallback(props.id);
    };

    return (
        <section>
            <p>{props.message}</p>
            <div>
                <button onClick={() => props.onHeartClick(props.id)}>{props.liked ? '❤️' : '🤍'}</button>
                <button onClick={deleteCard}>'Delete Card'</button>
            </div>
        </section>
    )
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    onClickCallback: PropTypes.func,
    liked: PropTypes.bool.isRequired,
    deleteCardCallback: PropTypes.func
};

export default Card;