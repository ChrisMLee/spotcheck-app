export const isAuthenticated = state => state.auth.isAuthenticated;

export const getLists = state => state.lists;

export const getListById = (state, id) => state.listsById[id];

export const getPlaceById = (state, id) => state.placesById[id];

export const getListsIsFetching = state => state.listsIsFetching;
