import { combineReducers } from 'redux';
import profilReducer from './setProfil';
import tokenReducer from './token';
import subActifReducer from './subAchievActif';

const allReducer = combineReducers({
  profil: profilReducer,
  token: tokenReducer,
  subActif: subActifReducer,
});

export default allReducer;
