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
import { persistStore, persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import storage from 'redux-persist/lib/storage';
import Auth from './reducers/loginReducer';
import Register from './reducers/registerReducer';
import Users from './reducers/userReducer';
import Projects from './reducers/projectReducer';
import Events from './reducers/eventReducer';
import Resources from './reducers/resourceReducer';
import RootReducer from './reducers/rootReducer';
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
      // RootReducer,
      // persistedReducer,
      ...createForms({
        eventForm: initialEventForm,
        projectForm: initialProjectForm,
        resourceForm: initialResourceForm,
      }),
    }),
    applyMiddleware(thunk, logger),
  );

  // const persistor = persistStore(store);

  // return { store, persistor };
  return store;
}
