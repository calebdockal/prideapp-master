import { AUTH, SEARCH } from '../constants';

const initialState = {
  isSearching: false,
  keyword: ''
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH.UPDATE_FIELD: 
          return {...state, ...action.value };
        case SEARCH.ENABLE:
            return {...state, isSearching: true};
        case SEARCH.DISABLE:
          return {...state, isSearching: false};
        case AUTH.LOGOUT: {
          return initialState;
        }
        default:
            return state;
    }
};

export default searchReducer;