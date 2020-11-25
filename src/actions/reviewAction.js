import { LOADING, REVIEW, BUSINESS } from '../constants';
import api from '../api';
import { showMessage } from "react-native-flash-message";

export const updateField = (value) => {
  return async (dispatch) => {
    dispatch({ type: REVIEW.UPDATE_FIELD, value })
  }
}

export const save = (cb) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const value = {
        user: getState().user._id,
        business: getState().business._id,
        rate: getState().review.rate,
        message: getState().review.message
      }

      const response = await api.review.save({...value,  token: getState().auth.token });
      if (response.data.success) {
        dispatch({ type: REVIEW.CLEAR })
        dispatch({ type: BUSINESS.ADD_RATING, rating: {...response.data.rating, business: getState().business, user: getState().user} })
        showMessage({
          message: "Review Submission Complete",
          description: "Review has been submitted!",
          type: "success",
          icon: "success"
        });
        cb();
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Review Submission Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}