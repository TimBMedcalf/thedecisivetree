import React from 'react';
import TheDecisionTree from './pages/TheDecisionTree';
import CreateDecision from './pages/CreateDecisions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <TheDecisionTree />
        </Route>
        <Route exact path='/create'>
          <CreateDecision />
        </Route>
      </Switch>
    </Router>
  );
}

export default routes;
