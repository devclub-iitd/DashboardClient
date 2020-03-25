import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Users from '../reducers/userReducer';

// eslint-disable-next-line no-undef
export default ConfigureStore = () => {
  const store = createStore(
    // combineReducers({
    //   users: Users,
    // }),
    // applyMiddleware(thunk, logger),
  );

  return store;
};
