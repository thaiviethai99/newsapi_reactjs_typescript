import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { NewsPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={NewsPage} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
