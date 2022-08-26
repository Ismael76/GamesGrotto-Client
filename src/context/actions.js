export const types = {
    SET_USER_DATA: "SET_USER_DATA",
  };
  
  export const setUserData = (user) => ({
    type: types.SET_USER_DATA,
    payload: { user },
  });
  