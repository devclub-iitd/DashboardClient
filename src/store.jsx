import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import Auth from './reducers/loginReducer';
import Register from './reducers/registerReducer';
import Users from './reducers/userReducer';
import Projects from './reducers/projectReducer';
import Events from './reducers/eventReducer';
import Resources from './reducers/resourceReducer';

export default function ConfigureStore() {
    const store = createStore(
        combineReducers({
            Auth,
            Register,
            Users,
            Events,
            Projects,
            Resources,
        }),
        // applyMiddleware(thunk, logger)
        applyMiddleware(thunk)
    );

    return store;
}
