import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer, projectsReducer, timerReducer } from './reducers';

const reducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  timer: timerReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
