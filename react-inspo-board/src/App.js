import React, { useState, useEffect } from 'react';
import CardList from './components/TaskList.js';
import BoardList from './components/BoardList.js';
import './App.css';
import axios, {isCancel, AxiosError} from 'axios';

function App() {
  return (
    <div>
      <header>

      </header>
      <main>
        <BoardList />
        <CardList />
      </main>
    </div>
  );
}

export default App;
