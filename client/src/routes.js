import React from 'react';
import TheDecisionTree from './pages/TheDecisionTree';
import CreateDecision from './pages/CreateDecisions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/header';

function routes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/create'>
          <CreateDecision />
        </Route>
        <Route exact path='/'>
          <TheDecisionTree />
        </Route>
        <Route
          exact
          path='/:id'
          render={props => <TheDecisionTree {...props} />}
        ></Route>
      </Switch>
    </Router>
  );
}

export default routes;
