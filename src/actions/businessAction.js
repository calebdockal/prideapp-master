import { BUSINESS, LOADING } from '../constants';
import api from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";

export const loadImages = () => ({
  type: BUSINESS.LOAD_IMAGES
});

export const clear = () => ({
  type: BUSINESS.CLEAR
});

export const updateField = (value) => {
  return async (dispatch) => {
    if (typeof value['country'] !== "undefined") {
      dispatch({ type: BUSINESS.UPDATE_REGIONS, value })
    } else {
      dispatch({ type: BUSINESS.UPDATE_FIELD, value })
    }
  }
}

export const updateCoordinates = (latitude, longitude) => ({
  type: BUSINESS.UPDATE_LOCATION,
  latitude,
  longitude
});

export const updateCurrentCoordinates = (currentLatitude, currentLongitude, currentLocation='') => ({
  type: BUSINESS.UPDATE_CURRENT_LOCATION,
  currentLatitude,
  currentLongitude,
  currentLocation
});
  
export const updateImages = (value) => {
  return async (dispatch, getState) => {
    if (getState().business.images.length < 8) {
      dispatch({ type: BUSINESS.UPDATE_IMAGES, value })
    } else {
      showMessage({
        message: "Upload Failed",
        description: "Cannot upload more than 8 images",
        type: "danger",
        icon: "danger"
      });
    }
  }
}

export const deleteImage = (id) => ({
  type: BUSINESS.DELETE_IMAGE,
  id
});

export const register = (cb) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const allowedFields = [
        'userId',
        'images',
        'businessName',
        'category',
        'details',
        'businessAddress',
        'country',
        'municipality',
        'zipCode',
        'contactAddress',
        'contactNumber',
        'latitude',
        'longitude'
      ];

      const filteredFields = Object.keys(getState().business)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          if (key === 'userId') {
              obj[key] = getState().user['_id'];
          } else {
              obj[key] = getState().business[key];
          }
          
          return obj;
          }, {});

      const response = await api.business.register({...filteredFields, token: getState().auth.token});

      if (response.data.success) {
        dispatch({
          type: BUSINESS.ADD,
          business: response.data.business
        })
        showMessage({
          message: "Business Registration Complete",
          description: "Business has been successfully created!",
          type: "success",
          icon: "success"
        });
        cb("BusinessOwnerHome");
      } else {
        throw response.data
      }
    } catch (error) {
      showMessage({
        message: "Business Registration Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const remove = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const response = await api.business.remove({ _id: id, token: getState().auth.token});
      if (response.data.success) {
        dispatch({
          type: BUSINESS.REMOVE,
          id
        })
        showMessage({
          message: "Business Deletion Complete",
          description: "Business successfully removed!",
          type: "success",
          icon: "success"
        });
      } else {
        throw response.data
      }
    } catch (error) {
      showMessage({
        message: "Business Deletion Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const update = (cb) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const allowedFields = [
        '_id',
        'userId',
        'images',
        'businessName',
        'category',
        'details',
        'businessAddress',
        'country',
        'municipality',
        'zipCode',
        'contactAddress',
        'contactNumber',
        'latitude',
        'longitude'
      ];

      const filteredFields = Object.keys(getState().business)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          if (key === 'userId') {
              obj[key] = getState().user['_id'];
          } else {
              obj[key] = getState().business[key];
          }
          
          return obj;
          }, {});
      
      const response = await api.business.update({...filteredFields, token: getState().auth.token});

      if (response.data.success) {
        dispatch({
          type: BUSINESS.UPDATE,
          business: response.data.business
        })
        showMessage({
          message: "Business Update Complete",
          description: "Business successfully updated!",
          type: "success",
          icon: "success"
        });
        cb("BusinessOwnerHome");
      } else {
        throw response.data;
      }
    } catch (error) {
      showMessage({
        message: "Business Update Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const loadList = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const storage = await AsyncStorage.multiGet(['token', 'userId']);
      const response = await api.business.list({token: storage[0][1], userId: storage[1][1], keyword: getState().search.keyword});
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
        message: "Business Load List Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const load = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    const response = await api.business.get({id, token: getState().auth.token});

    if (response.data.success) {
      dispatch({ type: BUSINESS.UPDATE_FIELD, value: response.data.business });
    }

    dispatch({ type: LOADING.DISABLE })
  }
}