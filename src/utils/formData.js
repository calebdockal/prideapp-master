
import FormData from 'form-data';

export const createFormData = (data) => {
  const formData = new FormData();

  data.images && data.images.map(image => {
    if (image.fileName) {
      formData.append('files', {
        name: image.fileName ? image.fileName : new Date().getTime(),
        type: image.type,
        uri: image.uri
      });
    } else {
      formData.append('images[]', image);
    }
  });

  Object.keys(data).forEach(key => {
    if (key !== 'images' && key !== "token") {
      formData.append(key, data[key]);
    }
  });
  
  return formData;
}

export const createProfileData = (data) => {
  const formData = new FormData();

  formData.append('files', {
    name: data.profilePicture.fileName ? data.profilePicture.fileName : new Date().getTime(),
    type: data.profilePicture.type,
    uri: data.profilePicture.uri
  });

  Object.keys(data).forEach(key => {
    if (key !== 'profilePicture') {
      formData.append(key, data[key]);
    }
  });
  
  return formData;
}