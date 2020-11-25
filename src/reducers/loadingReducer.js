import { LOADING } from '../constants';

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case LOADING.ENABLE:
            return true;
        case LOADING.DISABLE:
            return false;
        default:
            return state;
    }
};

export default loadingReducer;