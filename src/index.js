import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "material-design-icons/iconfont/material-icons.css";
import configureStore from "./configureStore";
import { Provider}from "react-redux";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
