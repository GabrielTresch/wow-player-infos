import { combineReducers } from 'redux';
import profilReducer from './setProfil';
import tokenReducer from './token';

const allReducer = combineReducers({
  profil: profilReducer,
  token: tokenReducer,
});

export default allReducer;
