import React from 'react';
import TheDecisionTree from './pages/TheDecisionTree';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <TheDecisionTree />
        </Route>
      </Switch>
    </Router>
  );
}

export default routes;
