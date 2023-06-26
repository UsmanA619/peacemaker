import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppSelector} from '../redux/app/hooks';
import {ApiService} from './ApiService';

interface Props {
  data: object;
}

export const storeUserData = async (data: Props) => {
  // converting object to string
  const userObjectString = JSON.stringify(data);

  await AsyncStorage.setItem('@session', userObjectString);
};

export const refreshMyToken = async (refreshToken: string) => {
  try {
    const newTokenReq = new ApiService('users/refresh', refreshToken);
    const newTokenRes = await newTokenReq.Get();

    return newTokenRes;
  } catch (error) {
    console.log(error);
  }
};
