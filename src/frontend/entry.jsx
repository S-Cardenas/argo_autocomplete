require('../sass/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';

document.addEventListener("DOMContentLoaded", function() {
  // const store = configureStore();
  ReactDOM.render(<Root />, document.getElementById('root'));
});
