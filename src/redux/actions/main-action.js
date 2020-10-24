import {mainActionTypes} from './action-types';

export const setToken = (token) => {
  return {
    type: mainActionTypes.SET_TOKEN,
    token: token,
  };
};
