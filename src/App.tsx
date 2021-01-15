import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { NewsPage } from './pages';
import { Search } from "./components";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={NewsPage} exact/>
        <Route path="/test/new"  component={Search}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
