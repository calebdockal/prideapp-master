import axios from 'axios';
import { createFormData, createProfileData } from '../utils/formData';
import { API_SERVER_URL } from '@env';

axios.defaults.baseURL = API_SERVER_URL;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = {
  auth: {
    login: data => axios.post('/api/auth/login', data),
    googleLogin: data => axios.post('/api/auth/googleLogin', data),
    facebookLogin: data => axios.post('/api/auth/facebookLogin', data),
    twitterLogin: data => axios.post('/api/auth/twitterLogin', data),
    register: data => axios.post('/api/auth/register', createFormData(data)),
    passwordReset: data => axios.post('/api/auth/passwordReset', data),
    passwordResetConfirm: data => axios.post('/api/auth/passwordResetConfirm', data),
  },
  user: {
    get: data => axios.get('/api/user', { params: data, headers: { Authorization: data.token }}),
    update: data => axios.put('/api/user', data, { headers: { Authorization: data.token } }),
    changePassword: data => axios.post('/api/user/changePassword', data, { headers: { Authorization: data.token } }),
    updateLocationService: data => axios.put('/api/user/locationService', data, { headers: { Authorization: data.token } }),
    updateProfilePicture: data => axios.put('/api/user/profilePicture', createProfileData(data), { headers: { Authorization: data.token } }),
    getBusinessList: data => axios.get('/api/user/businessList', { params: data, headers: { Authorization: data.token } }),
    getBusiness: data => axios.get('/api/user/business/' + data.id, { headers: { Authorization: data.token } }),
    loadSavedList: data => axios.get('/api/user/loadSavedList', { params: data, headers: { Authorization: data.token } }),
    saveBusiness: data => axios.post('/api/user/saveBusiness', data, { headers: { Authorization: data.token } }),
    unsaveBusiness: data => axios.post('/api/user/unsaveBusiness', data, { headers: { Authorization: data.token } }),
  },
  business: {
    register: data => axios.post('/api/business/register', createFormData(data), { headers: { Authorization: data.token } }),
    list: data => axios.get('/api/business/list', { params: data, headers: { Authorization: data.token } }),
    get: data => axios.get('/api/business/' + data.id, { headers: { Authorization: data.token } }),
    update: data => axios.put('/api/business/' + data._id, createFormData(data), { headers: { Authorization: data.token } }),
    remove: data => axios.delete('/api/business/' + data._id, { headers: { Authorization: data.token } })
  },
  review: {
    save: data => axios.post('/api/review', data, { headers: { Authorization: data.token } }),
  }
};

export default api;