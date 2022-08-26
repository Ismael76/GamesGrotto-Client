import { types } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        ...action.payload.user,
      };

    default:
      return state;
  }
};

export default reducer;
