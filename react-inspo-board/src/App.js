import React, { useState, useEffect } from 'react';
import CardList from './components/CardList.js';
import BoardList from './components/BoardList.js';
import './App.css';
import axios, {isCancel, AxiosError} from 'axios';

function App() {
  return (
    <div>
      <header>
        <h1>Inspo Board</h1>
        <h2>Board Description!</h2>
      </header>
      <main>
        <BoardList />
      </main>
    </div>
  );
}

export default App;
