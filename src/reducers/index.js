import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import searchReducer from './searchReducer';
import businessReducer from './businessReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
    isLoading: loadingReducer,
    search: searchReducer,
    business: businessReducer,
    user: userReducer,
    review: reviewReducer,
    auth: authReducer
});

export default rootReducer;