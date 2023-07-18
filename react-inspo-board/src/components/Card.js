import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ card, likeCard, deleteCard }) => {
// const Card = (props) => {

    // const onLikeCard = () => {
    //     console.log('Card like toggle working');
    //     props.likeCard(props.id);
    // };

    // const onDeleteCard = () => {
    //     console.log('Card deleted properly');
    //     props.deleteCard(props.id);
    // };

    // return (
    //     <section>
    //         <p>{props.message}</p>
    //         <div>
    //             <button onClick={onLikeCard}>
    //                 {props.likeCard ? '❤️' : '🤍'}
    //             </button>
    //             {/* <p>{likeCount}</p> */}
    //             <button onClick={onDeleteCard}>
    //                 Delete Card
    //             </button>
    //         </div>
    //     </section>
    // )

    return (
        <section>
            <p>{card.message}</p>
            <div>
                <button onClick={likeCard(card)}>
                    {card.likeCard ? '❤️' : '🤍'}
                </button>
                {/* <p>{likeCount}</p> */}
                <button onClick={deleteCard(card)}>
                    Delete Card
                </button>
            </div>
        </section>
    )
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    // id: PropTypes.number.isRequired,
    // message: PropTypes.string.isRequired,
    likeCard: PropTypes.func.isRequired,
    // likeCount: PropTypes.number.isRequired,
    deleteCard: PropTypes.func.isRequired
};

export default Card;