import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home/Home';
import {GAMES} from '../games';
import {PLAYERS} from '../players';

const App = () => (
  <Home games={GAMES} players={PLAYERS} />
);

ReactDOM.render(<App />, document.getElementById('app'));