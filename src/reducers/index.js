
import { USER_LOGIN, USER_LOGOUT } from '../actions';

// Define the initial state
const initialState = {
  loggedIn: false,
  user: null,
};

// Define the reducer function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload, // Assuming you store user data in action.payload
      };
    case USER_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
