import {mainActionTypes} from '../actions/action-types';

let initialState = {
  token: null,
  isSubscribed: false,
  eventsData: {
    events: [],
    locations: [],
    eventApiStatus: '',
  },
};
export const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case mainActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
      break;
    case mainActionTypes.GET_SUBCRIPTION:
      return {
        ...state,
        isSubscribed: action.isSubscribed,
      };
      break;
    case mainActionTypes.GET_EVENTS_DATA:
      return {
        ...state,
        eventsData: action.eventsData,
      };
      break;
    case mainActionTypes.SET_EVENT_API_STATUS:
      return {
        ...state,
        eventApiStatus: action.apiStatus,
      };
      break;
    case mainActionTypes.RESET_VALUES:
      return {
        ...state,
        token: null,
        isSubscribed: false,
        eventsData: {
          events: [],
          locations: [],
          eventApiStatus: '',
        },
      };
      break;
  }
  return state;
};
