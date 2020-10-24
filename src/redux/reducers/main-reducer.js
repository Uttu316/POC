import {mainActionTypes} from '../actions/action-types';

let initialState = {
  token: null,
};
export const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case mainActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
      break;
  }
  return state;
};
