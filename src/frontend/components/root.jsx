import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AutoComplete from './autocomplete/autocomplete';
import Second from './second/second';

const Root = () => (
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={AutoComplete} />
      <Route path="/second" component={Second} />
    </Route>
  </Router>
);

export default Root;
