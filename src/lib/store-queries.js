export const isAuthenticated = state => state.auth.isAuthenticated;

export const getLists = state => state.lists;

export const getList = (state, id) => state.listsById[id];
