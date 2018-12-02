import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducer ,{enableBatching}from "./reducers";
import  { createStore, applyMiddleware } from "./redux";
import { Provider }from "react-redux";
import  Thunk from "redux-thunk";



const createStoreWithMiddleware = applyMiddleware(Thunk)(createStore);
const store=createStoreWithMiddleware(enableBatching(reducer));

 ReactDOM.render(   
    <Provider	store ={store}>
       <App />
    </Provider	>,
    document.getElementById('root')
  )
