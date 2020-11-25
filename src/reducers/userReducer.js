import { AUTH, USER } from '../constants';

const initialState = {
  _id: "",
  email: "", 
  firstName: "", 
  lastName: "",
  mobile: "",
  password: "",
  role: "",
  createdAt: "",
  updatedAt: "",
  locationService: false,
  profilePicture: null,

  newPassword: "",
  confirmPassword: "",

  saves: [],

  error: "",
  message: ""
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.UPDATE_FIELD: {
      return {...state, ...action.value };
    }
    case USER.LOAD_SAVED_LIST: {
      return {...state, saves: action.list};
    }
    case USER.SAVE_BUSINESS: {
      return {...state, saves: [...state.saves, action.business]}
    }
    case USER.UNSAVE_BUSINESS: {
      return {...state, saves: state.saves.filter(save => save._id !== action.id)}
    }
    case AUTH.LOGOUT: {
      return initialState;
    }
    default:
        return state;
  }
};

export default userReducer;