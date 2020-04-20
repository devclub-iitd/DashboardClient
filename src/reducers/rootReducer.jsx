
import { combineReducers } from 'redux';
import createForms from 'react-redux-form';
import { InitialFeedback } from './forms';
// import loginReducer from './loginReducer';
// import registerReducer from './registerReducer';
// import profileReducer from './profileReducer';
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
