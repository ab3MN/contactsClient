import { combineReducers } from 'redux';

const userReducer = (state = {}) => state;

const errorReducer = (state = '') => state;

export default combineReducers({
  user: userReducer,
  error: errorReducer,
});
