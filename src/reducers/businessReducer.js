import { AUTH, BUSINESS } from '../constants';
import Countries from 'country-region-data'

const initialState = {
  _id: "",
  userId: "",
  images: [],
  businessName: '',
  category: '',
  details: '',

  businessAddress: '',
  country: '',
  municipality: '',
  zipCode: '',
  contactAddress: '',
  contactNumber: '',

  status: '',
  ratings: [],
  
  list: [],

  latitude: null,
  longitude: null,

  currentLatitude: null,
  currentLongitude: null,
  currentLocation: '',

  countries: Countries.map(country => ({ label: country.countryName, value: country.countryName })),
  regions: [],
  error: ''
}


const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUSINESS.LOAD_IMAGES: {
      return {...state, images: action.images}
    }
    case BUSINESS.UPDATE_LOCATION: {
      return { ...state, latitude: action.latitude, longitude: action.longitude }
    }
    case BUSINESS.UPDATE_CURRENT_LOCATION: {
      return { ...state, currentLatitude: action.currentLatitude, currentLongitude: action.currentLongitude, currentLocation: action.currentLocation }
    }
    case BUSINESS.ADD: {
      return {...state, list: [...state.list, action.business] }
    }
    case BUSINESS.ADD_RATING: {
      return {...state, ratings: [...state.ratings, action.rating] }
    }
    case BUSINESS.REMOVE: {
      return {...state, list: state.list.filter(item => item._id !== action.id)}
    }
    case BUSINESS.DELETE_IMAGE: {
      const newImages = state.images.filter((x, id) => id !== action.id);
      return {...state, images: newImages}
    }
    case BUSINESS.UPDATE: {
      const list = state.list.map(item => {
        if (item._id === action.business._id) {
          return action.business;
        } else {
          return item
        }
      });

      return {...state, list}
    }
    case BUSINESS.LOAD_LIST: {
      return {...state, list: action.list };
    }
    case BUSINESS.UPDATE_FIELD: {
      return {...state, ...action.value };
    }
    case BUSINESS.UPDATE_IMAGES: {
      return {...state, images: [action.value, ...state.images]}
    }
    case BUSINESS.UPDATE_REGIONS: {
      const [res] = Countries.filter(country => country.countryName === action.value.country);
      const regions = res.regions.map(region => ({ label: region.name, value: region.name }));
      return {...state, ...action.value, regions }
    }
    case BUSINESS.CLEAR : {
      return { ...initialState, list: state.list };
    }
    case AUTH.LOGOUT: {
      return initialState;
    }
    default:
        return state;
  }
};

export default businessReducer;