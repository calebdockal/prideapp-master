import { SEARCH } from '../constants';

export const updateField = (value) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH.UPDATE_FIELD, value })
  }
}

export const toggleSearch = () => {
  return async (dispatch, getState) => {
    dispatch({ type: getState().search.isSearching ? SEARCH.DISABLE : SEARCH.ENABLE })
  }
}