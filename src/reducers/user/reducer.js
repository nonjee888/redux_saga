import {
  SEARCH_USERS_REQ,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAIL,
} from "./action";

const initialState = {
  userList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS_REQ:
      return {
        ...state,
        error: null,
      };
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        userList: action.data,
      };
    case SEARCH_USERS_FAIL:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default userReducer;
