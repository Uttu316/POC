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

export const getEventsData = (eventsData) => {
  return {
    type: mainActionTypes.GET_EVENTS_DATA,
    eventsData,
  };
};

export const setEventAPIStatus = (apiStatus) => {
  return {
    type: mainActionTypes.SET_EVENT_API_STATUS,
    apiStatus,
  };
};

export const resetValues = () => {
  return {
    type: mainActionTypes.RESET_VALUES,
  };
};
