import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const INITIAL_FORM_DATA = {
  title: '',
  description: '',
  owner: ''
};

const NewBoardForm = (props) => {
  const [boardFormData, setBoardFormData] = useState(INITIAL_FORM_DATA);

  const anInputChanged = (evt) => {
    const newBoardFormData = {
      ...boardFormData,
      [evt.target.name]: evt.target.value
    };
    setBoardFormData(newBoardFormData);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.createNewBoard(boardFormData);
    setBoardFormData(INITIAL_FORM_DATA);
  };

  return (
    <section className={props.showHide}>
      <h3>Create New Board</h3>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='boardName'>Board Title:</label>
        <input
          id='boardTitle'
          name='title'
          type='text'
          value={ boardFormData.title }
          onChange={ anInputChanged }
        />
        <label htmlFor='boardDescription'>Description:</label>
        <input
          id='boardDescription'
          name='description'
          type='text'
          value={ boardFormData.description }
          onChange={ anInputChanged }
        />
        <label htmlFor='boardOwner'>Owner:</label>
        <input
          id='boardOwner'
          name='owner'
          type='text'
          value={ boardFormData.owner }
          onChange={ anInputChanged }
        />
        <input type='submit' value='Add new board'></input>
      </form>
    </section>
  );
};

NewBoardForm.propTypes = {
  showHide: PropTypes.string.isRequired,
  createNewBoard: PropTypes.func.isRequired
};

export default NewBoardForm;