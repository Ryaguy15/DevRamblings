export const getUserState = store => store.user;
export const getUserToken = store => getUserState(store).token;
export const getIsUserLoggedIn = store => getUserToken(store) !== "";