import { createStore, combineReducers } from 'redux';

import loginReducer from './redurces/loginReducer';
import modalReducer from './redurces/modalReducer';
import fileReducer from './redurces/fileReducer';
import processReducer from './redurces/ProcessReducer';
import addressNotifiedReducer from './redurces/addressNotifiedReducer';

const redurces = combineReducers({
  login: loginReducer,
  modal: modalReducer,
  file: fileReducer,
  process: processReducer,
  addressNotified: addressNotifiedReducer,
});

const store = () => createStore(redurces);

export default store;
