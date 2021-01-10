import * as React from 'react';
// @ts-ignore
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Todo from './views/Todolist';
import {message} from 'antd';
import './App.css';

message.config({
  duration: 1,
  maxCount: 3,
});

const App: React.FC = () => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Todo}/>
      </Switch>
    </BrowserRouter>
  </React.Fragment>
);

export default App;
