import { AUTH, REVIEW } from '../constants';

const initialState = {
  message: '',
  rate: 0
}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case REVIEW.UPDATE_FIELD: 
          return {...state, ...action.value };
        case REVIEW.CLEAR: {
          return initialState;
        }
        case AUTH.LOGOUT: {
          return initialState;
        }
        default:
            return state;
    }
};

export default reviewReducer;