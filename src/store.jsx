// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import promise from 'redux-promise-middleware';
// import rootReducer from './reducers/rootReducer';

// export default function configureStore(initialState = {}) {
//   return createStore(
//     rootReducer,
//     initialState,
//     applyMiddleware(promise, thunk, logger),
//   );
// }
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

let configureStore;
// eslint-disable-next-line no-undef
export default configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger),
  );

  return store;
};
