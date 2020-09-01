import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { List, Add } from './Pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/' component={List} exact />
        <Route path='/add' component={Add} />
      </Switch>
    </div>
  );
};

export default App;
