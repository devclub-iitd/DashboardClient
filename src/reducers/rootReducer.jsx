import { combineReducers } from 'redux';
import Auth from './loginReducer';
import Register from './registerReducer';
import Users from './userReducer';
import Projects from './projectReducer';
import Events from './eventReducer';
import Resources from './resourceReducer';

export default combineReducers({
  Auth,
  Register,
  Users,
  Events,
  Projects,
  Resources,
});
