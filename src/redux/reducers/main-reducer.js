import {mainActionTypes} from '../actions/action-types';

let initialState = {
  token: null,
  isSubscribed: false,
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
  }
  return state;
};
