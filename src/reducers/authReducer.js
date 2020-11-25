import { AUTH, LOADING } from '../constants';
import Countries from 'country-region-data'

const initialState = {
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',

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

  verificationCode: '',
  token: '',

  countries: Countries.map(country => ({ label: country.countryName, value: country.countryName })),
  regions: [],
  error: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING.ENABLE: {
          return {...state, error: ''};
        }
        case AUTH.UPDATE_FIELD: {
          return {...state, ...action.value };
        }
        case AUTH.UPDATE_IMAGES: {
          return {...state, images: [action.value, ...state.images]}
        }
        case AUTH.DELETE_IMAGE: {
          const newImages = state.images.filter((image, id) => id !== action.id);
          return {...state, images: newImages}
        }
        case AUTH.UPDATE_REGIONS: {
          const [res] = Countries.filter(country => country.countryName === action.value.country);
          const regions = res.regions.map(region => ({ label: region.name, value: region.name }));
          return {...state, ...action.value, regions }
        }
        case AUTH.LOGOUT: {
          return initialState;
        }
        default:
            return state;
    }
};

export default authReducer;