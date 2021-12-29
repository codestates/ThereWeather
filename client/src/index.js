<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
=======
/* eslint-disable */
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import store from "./store/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
>>>>>>> 44913424c771d5d303ad4e893f746bcb054b85e1

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

