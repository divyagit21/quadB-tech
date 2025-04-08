import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers';

const store = createStore(userReducer, composeWithDevTools());

export default store;
