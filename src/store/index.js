
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const configureStore = () => {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? compose(
                  applyMiddleware(thunk),
                  window.__REDUX_DEVTOOLS_EXTENSION__(),
              )
            : applyMiddleware(thunk),
    );
    return store;
};

export default configureStore;