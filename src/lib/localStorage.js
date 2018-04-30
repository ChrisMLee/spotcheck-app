export const loadAuthtoken = () => {
  try {
    const serializedState = localStorage.getItem("auth_token");
    if (serializedState === null) {
      return undefined;
    }
    return { auth: { isAuthenticated: true } };
  } catch (err) {
    return undefined;
  }
};
