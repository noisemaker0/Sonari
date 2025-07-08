import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    // handle error
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (e) {
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    // handle error
  }
};