
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  loginReducer,
  profileReducer,
  registerReducer,
});
