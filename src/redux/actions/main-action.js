import {mainActionTypes} from './action-types';

export const setToken = (token) => {
  return {
    type: mainActionTypes.SET_TOKEN,
    token: token,
  };
};

export const getSubscription = (isSubscribed) => {
  return {
    type: mainActionTypes.GET_SUBCRIPTION,
    isSubscribed,
  };
};
