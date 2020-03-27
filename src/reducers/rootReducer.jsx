
import { combineReducers } from 'redux';
import createForms from 'react-redux-form';
import { InitialFeedback } from './forms';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  loginReducer,
  profileReducer,
  registerReducer,
  ...createForms({
    createTask: InitialFeedback,
  }),
});
