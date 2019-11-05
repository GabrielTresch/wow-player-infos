import { combineReducers } from 'redux';
import profilReducer from './setProfil';

const allReducer = combineReducers({
  profil: profilReducer,
});

export default allReducer;
