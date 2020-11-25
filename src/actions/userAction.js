import { LOADING, USER, BUSINESS } from '../constants';
import api from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";

export const updateField = (value) => {
  return async (dispatch) => {
    dispatch({ type: USER.UPDATE_FIELD, value })
  }
}

export const updateProfile = (navigation) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const { email, firstName, lastName, mobile } = getState().user;
      const response = await api.user.update({ email, firstName, lastName, mobile, token: getState().auth.token });

      if (response.data.success) {
        showMessage({
          message: "Profile Update Complete",
          description: "Profile has been updated!",
          type: "success",
          icon: "success"
        });
        navigation.goBack();
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Profile Update Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
} 

export const changePassword = (navigation) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const { email, newPassword, confirmPassword } = getState().user;
      const response = await api.user.changePassword({ email, newPassword, confirmPassword, token: getState().auth.token });

      if (response.data.success) {
        showMessage({
          message: "Password Change Complete",
          description: "Password has been changed!",
          type: "success",
          icon: "success"
        });
        navigation.goBack();
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Password Change Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
} 

export const updateLocationService = (value) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    dispatch({ type: USER.UPDATE_FIELD, value })
    try {
      const response = await api.user.updateLocationService({ email: getState().user.email, locationService: value.locationService, token: getState().auth.token });

      if (response.data.success) {
        showMessage({
          message: "Location Update Complete",
          description: "Location service has been updated!",
          type: "success",
          icon: "success"
        });
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Location Update Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const updateProfilePicture = (value) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const response = await api.user.updateProfilePicture({ email: getState().user.email, profilePicture: value.profilePicture, token: getState().auth.token });

      if (response.data.success) {
        value.profilePicture = value.profilePicture.uri;
        dispatch({ type: USER.UPDATE_FIELD, value })
        showMessage({
          message: "Profile Update Complete",
          description: "Photo has been uploaded!",
          type: "success",
          icon: "success"
        });
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Profile Update Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const loadBusinessList = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const storage = await AsyncStorage.multiGet(['token', 'userId']);
      const response = await api.business.list({token: storage[0][1], keyword: getState().search.keyword});
      if (response.data.success) {
        dispatch({
          type: BUSINESS.LOAD_LIST,
          list: response.data.list
        })
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Business Load Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const loadSavedList = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const storage = await AsyncStorage.multiGet(['token', 'userId']);
      const response = await api.user.loadSavedList({token: storage[0][1], userId: storage[1][1], keyword: getState().search.keyword});

      if (response.data.success) {
        dispatch({
          type: USER.LOAD_SAVED_LIST,
          list: response.data.list
        })
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Saved List Load Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const saveBusiness = () => {
  return async (dispatch, getState) => {
    for (let save of getState().user.saves) {
      if (save.business._id === getState().business._id) {
        showMessage({
          message: "Business Save Failed",
          description: "Business is already saved!",
          type: "danger",
          icon: "danger"
        });
        return;
      }
    }
    dispatch({ type: LOADING.ENABLE })
    try {
      const response = await api.user.saveBusiness({token: getState().auth.token, user: getState().user._id, business: getState().business._id});

      if (response.data.success) {
        dispatch({
          type: USER.SAVE_BUSINESS,
          business: {...response.data.save, user: getState().user, business: getState().business}
        })
        showMessage({
          message: "Business Save Complete",
          description: "Business successfully saved!",
          type: "success",
          icon: "success"
        });
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Business Save Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const unsaveBusiness = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const response = await api.user.unsaveBusiness({ _id: id, token: getState().auth.token});
      if (response.data.success) {
        dispatch({
          type: USER.UNSAVE_BUSINESS,
          id
        });
        showMessage({
          message: "Business Unsave Complete",
          description: "Business has been successfully unsaved!",
          type: "success",
          icon: "success"
        });
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Business Unsave Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}