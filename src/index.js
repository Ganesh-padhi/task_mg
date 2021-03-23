import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'

import authReducer from "./Store/Reducers/auth";
import taskReducer from "./Store/Reducers/task";
import labelReducer from "./Store/Reducers/Label";
const composeEnhacer=process.env.NODE_ENV=="development"? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;

const saveLocalStorage=(state)=>{
  try {
    const serializedState=JSON.stringify(state)
    localStorage.setItem("state",serializedState)
  } catch (error) {
    console.log(error)
  }
}

const loadFromLacalStorage=()=>{
  try {
    const serializedState=localStorage.getItem("state")
    if(serializedState==null) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const persistedState=loadFromLacalStorage()

const rootReducer=combineReducers({
  auth:authReducer,
  task:taskReducer,
  label:labelReducer
})
const store=createStore(rootReducer,persistedState,composeEnhacer(applyMiddleware(thunk)))

store.subscribe(()=>saveLocalStorage(store.getState()))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
