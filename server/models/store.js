import { createStore, applyMiddleware, combineReducers } from 'redux';
import {END} from 'redux-saga';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../../client/js/saga'
const sagaMiddleware = createSagaMiddleware();

var passInData = function(url, data) {

  const todo = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
          text: action.text,
          completed: false
        };
      case 'TOGGLE_TODO':
        if (state.id !== action.id) {
          return state;
        }
  
        return {
          ...state,
          completed: !state.completed
        };
      default:
        return state;
    }
  };
  
  const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          todo(undefined, action)
        ];
      case 'TOGGLE_TODO':
        return state.map(t =>
            todo(t, action)
        );
      default:
        return state;
    }
  };
  
  const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
      default:
        return state;
    }
  };
  
  if (typeof window !== 'undefined') {
    var url = window.location.href.split('/').pop();
  } else {
    url = url.split('/').pop();
  }
  url = url.split('?');
  var allParams = {id: url[0]};
  if (url.length > 1) {
    var urlParams = url[1].split('&');
    allParams = urlParams.reduce((acc, param) => {
      param = param.split('=');
      acc[param[0]] = param[1];
      return acc;
    }, allParams);
  }
  console.log(allParams);
  
  const params = (state = allParams, action) => {
    switch (action.type) {
      default:
        return state
    }
  };
  
  //console.log('Data in store: ', data);
  const initialReviews = {
    data: data,
    dataFetched: false,
    isFetching: false,
    error: false
  }
  const reviews = (state = initialReviews, action) => {
    switch (action.type) {
      case 'FETCHING_REVIEWS':
        return {
          ...state,
          data: [],
          isFetching: true
        }
      case 'FETCHING_REVIEWS_SUCCESS':
        return {
          ...state,
          isFetching: false,
          data: action.data
        }
      case 'FETCHING_REVIEWS_FAILURE':
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
  }
  const initialUsers = {
    data: {},
    dataFetched: false,
    isFetching: false,
    error: false
  }
  const userData = (state = initialUsers, action) => {
    switch (action.type) {
      case 'FETCHING_USERDATA':
        return {
          ...state,
          isFetching: true
        }
      case 'FETCHING_USERDATA_SUCCESS':
        return {
          ...state,
          isFetching: false,
          data: {...state.data, [action.id]: action.data}
        }
      case 'FETCHING_USERDATA_FAILURE':
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
  }
  const reviewsApp = combineReducers({todos, params, visibilityFilter, reviews, userData});
  return reviewsApp;
}  

export default function configureStore(url, data) {
  const store = createStore(passInData(url, data), applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}