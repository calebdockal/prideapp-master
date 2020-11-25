import AsyncStorage from '@react-native-community/async-storage';

export const setStorage = async (data) => {
  const values = [];
  Object.keys(data).forEach(key => {
    values.push([key, data[key]]);
  })
  await AsyncStorage.multiSet(values);
}