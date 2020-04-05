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
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createForms } from 'react-redux-form';
import logger from 'redux-logger';
import Auth from './reducers/loginReducer';
import Register from './reducers/registerReducer';
import Users from './reducers/userReducer';
import Projects from './reducers/projectReducer';
import Events from './reducers/eventReducer';
import Resources from './reducers/resourceReducer';
import { initialEventForm, initialProjectForm, initialResourceForm } from './reducers/forms';

// import rootReducer from './reducers/rootReducer';

// let configureStore;
// eslint-disable-next-line no-undef
export default function ConfigureStore() {
  const store = createStore(
    combineReducers({
      Auth,
      Register,
      Users,
      Events,
      Projects,
      Resources,
      // profileReducer,
      // registerReducer,
      ...createForms({
        eventForm: initialEventForm,
        projectForm: initialProjectForm,
        resourceForm: initialResourceForm,
      }),
    }),
    applyMiddleware(thunk, logger),
  );

  return store;
}
