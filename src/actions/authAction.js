import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AUTH, LOADING, USER } from '../constants';
import api from '../api';
import { NativeModules } from 'react-native';
import { setStorage } from '../utils/storage';
import { showMessage } from "react-native-flash-message";
import { GOOGLE_WEB_CLIENT_ID, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } from '@env';

export const updateField = (value) => {
  return async (dispatch) => {
    if (typeof value['country'] !== "undefined") {
      dispatch({ type: AUTH.UPDATE_REGIONS, value })
    } else {
      dispatch({ type: AUTH.UPDATE_FIELD, value })
    }
  }
}

export const updateImages = (value) => {
  return async (dispatch, getState) => {
    if (getState().auth.images.length < 8) {
      dispatch({ type: AUTH.UPDATE_IMAGES, value })
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

export const login = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const { email, password } = getState().auth;
      const response = await api.auth.login({email, password});

      if (response.data.success) {
        const value = { token: response.data.token, userId: response.data.user._id, role: response.data.user.role, email };
        await setStorage(value);
        dispatch({
          type: AUTH.UPDATE_FIELD,
          value
        })
      } else {
        throw response.data
      }
    } catch (error) {
      showMessage({
        message: "Authentication Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}


export const googleLogin = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING.ENABLE })

    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true
    });

    try {
      if (await GoogleSignin.isSignedIn()) 
        await GoogleSignin.signOut();

      const data = await GoogleSignin.signIn();
      if (data.user) {
        const { user } = data;
        const { idToken } = await GoogleSignin.getTokens();
        const response = await api.auth.googleLogin({email: user.email, idToken});

        if (response.data.success) {
          const role = response.data.data || 'client';
          const value = { token: response.data.token, role, email: user.email, firstName: user.givenName, lastName: user.familyName };
          await setStorage(value);
          dispatch({
            type: AUTH.UPDATE_FIELD,
            value
          });
        } else {
          showMessage({
            message: "Authentication Failed",
            description: response.data.message,
            type: "danger",
            icon: "danger"
          });
        }
      } else {
        showMessage({
          message: "Authentication Failed",
          description: "No user data found",
          type: "danger",
          icon: "danger"
        });
      }
    } catch (error) {
      showMessage({
        message: "Authentication Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const facebookLogin = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      LoginManager.logOut;
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
      if (!result.isCancelled) {
        const res = await AccessToken.getCurrentAccessToken();
        if (res) {
          const response = await api.auth.facebookLogin({ userID: res.userID, accessToken: res.accessToken });
          if (response.data.success) {
            await AsyncStorage.multiSet([ ['token', response.data.token], ['email', response.data.data.email] ]);
            const role = response.data.data.role || 'client';
            const value = { token: response.data.token, role, email: response.data.data.email, firstName: response.data.data.first_name, lastName: response.data.data.last_name };
            await setStorage(value)
            dispatch({
              type: AUTH.UPDATE_FIELD,
              value
            })
          } else {
            showMessage({
              message: "Authentication Failed",
              description: response.data.message,
              type: "danger",
              icon: "danger"
            });
          }
        } else {
          showMessage({
            message: "Authentication Failed",
            description: "Invalid token",
            type: "danger",
            icon: "danger"
          });
        }
      } 
    } catch (error) {
      showMessage({
        message: "Authentication Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const twitterLogin = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING.ENABLE })
    const { RNTwitterSignIn } = NativeModules;

    try {
      await RNTwitterSignIn.init(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
      const data = await RNTwitterSignIn.logIn();
      if (data) {
        const response = await api.auth.twitterLogin({ email: data.email, authToken: data.authToken, authTokenSecret: data.authTokenSecret })
        if (response.data.success) {
          await AsyncStorage.multiSet([ ['token', response.data.token], ['email', data.email] ])
          const role = response.data.data.role || 'client';
          const value = { email: data.email, role, firstName: response.data.data.name.split(' ').slice(0, -1).join(' '), lastName: response.data.data.name.split(' ').slice(-1).join(' ') };
          await setStorage(value)
          dispatch({
            type: AUTH.UPDATE_FIELD,
            value
          })
        } else {
          showMessage({
            message: "Authentication Failed",
            description: response.data.message,
            type: "danger",
            icon: "danger"
          });
        }
      } else {
        showMessage({
          message: "Authentication Failed",
          description: "Invalid twitter response",
          type: "danger",
          icon: "danger"
        });
      }
    } catch (error) {
      showMessage({
        message: "Authentication Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const register = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      let allowedFields = [
        'firstName',
        'lastName',
        'email',
        'role',
        'mobile',
        'password',
        'confirmPassword'
      ]

      if (getState().auth.role === "business_owner") {
        allowedFields = [
          'firstName',
          'lastName',
          'email',
          'role',
          'mobile',
          'password',
          'confirmPassword',
          'images',
          'businessName',
          'category',
          'details',
          'businessAddress',
          'country',
          'municipality',
          'zipCode',
          'contactAddress',
          'contactNumber'
        ]
      }

      const filteredFields = Object.keys(getState().auth)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = getState().auth[key];
          return obj;
        }, {});

      if (getState().auth.role === 'business_owner') {
        filteredFields['latitude'] = getState().business.latitude;
        filteredFields['longitude'] = getState().business.longitude;
      }

      const response = await api.auth.register(filteredFields);

      if (response.data.success) {
        AsyncStorage.multiSet([
          ['userId', response.data.user._id],
          ['token', response.data.token],
          ['email', filteredFields['email']],
          ['role', filteredFields['role']],
        ]);
      } else {
        showMessage({
          message: "Registration Failed",
          description: response.data.message,
          type: "danger",
          icon: "danger"
        });
      }
    } catch (error) {
      showMessage({
        message: "Registration Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const passwordReset = (cb) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const { email, password, confirmPassword } = getState().auth;
      const response = await api.auth.passwordReset({
        email,
        password,
        confirmPassword
      });

      if (!response.data.success) {
        throw response.data;
      } else {
        cb('ForgotPasswordConfirm');
      }
    } catch (error) {
      showMessage({
        message: "Password Reset Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const deleteImage = (id) => ({
  type: AUTH.DELETE_IMAGE,
  id
});

export const passwordResetConfirm = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING.ENABLE })
    try {
      const { email, verificationCode } = getState().auth;
      const response = await api.auth.passwordResetConfirm({
        email,
        verificationCode: parseInt(verificationCode)
      });

      if (response.data.success) {
        setTimeout(() => dispatch(login()));
      } else {
        throw response.data
      }
    } catch (error) {
      showMessage({
        message: "Password Reset Failed",
        description: error.message,
        type: "danger",
        icon: "danger"
      });
    }
    dispatch({ type: LOADING.DISABLE })
  }
}

export const logout = (navigation) => {
  return async (dispatch) => {
    await AsyncStorage.clear();
    dispatch({ type: AUTH.LOGOUT });
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginStack' }],
    });
  }
}

export const load = () => {
  return async (dispatch) => {
    const storage = await AsyncStorage.multiGet(['token', 'userId', 'email', 'role'])
    const value = {};
    storage.map(field => {
      value[field[0]] = field[1];
    });

    const response = await api.user.get(value);
    if (response.data.success) {
      if (response.data.user.profilePicture) response.data.user.profilePicture.uri = response.data.user.profilePicture;
      dispatch({ type: USER.UPDATE_FIELD, value: response.data.user });
      dispatch({ type: AUTH.UPDATE_FIELD, value });
    }
  }
}