import { normalize } from "normalizr";
import { list } from "./schema";

const FETCH_LISTS_REQUEST = "FETCH_LISTS_REQUEST";
const FETCH_LISTS_SUCCESS = "FETCH_LISTS_SUCCESS";
const FETCH_LISTS_FAILURE = "FETCH_LISTS_FAILURE";

/*
const ids = (state = [], action) => {
  switch (action.type) {
    case "FETCH_TODOS_SUCCESS":
      return filter === action.filter ? action.response.result : state;
    case "ADD_TODO_SUCCESS":
      return filter !== "completed"
        ? [...state, action.response.result]
        : state;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
};

export default byId;

export const getTodo = (state, id) => state[id];


export const getVisibleTodos = (state, filter) => {
const ids = fromList.getIds(state.listByFilter[filter]);
return ids.map(id => fromById.getTodo(state.byId, id));
};

const byId = (state = {}, action) => {
if (action.response) {
return {
...state,
...action.response.entities.todos,
};
}
return state;
};

export default byId;

export const getTodo = (state, id) => state[id];
*/

// TODO: abstract jwt behavior into a separate helper
// see Fetching Quotes with API Middleware
export const fetchLists = () => (dispatch, getState) => {
  dispatch({
    type: FETCH_LISTS_REQUEST
  });

  const token = localStorage.getItem("auth_token") || null;

  if (!token) {
    throw new Error("No token saved!");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  fetch(`http://localhost:3001/lists`, config)
    .then(
      response =>
        response.json().then(lists => {
          dispatch({
            type: FETCH_LISTS_SUCCESS,
            response: normalize(lists, [list])
          });
        }),
      error => {
        dispatch({
          type: FETCH_LISTS_FAILURE,
          message: error.message || "Something went wrong."
        });
      }
    )
    .catch(err => console.log("err", err));
};

export const listsIsFetching = (state = false, action) => {
  if (filter !== action.filter) {
    return state;
  }
  switch (action.type) {
    case "FETCH_LISTS_REQUEST":
      return true;
    case "FETCH_LISTS_SUCCESS":
    case "FETCH_LISTS_FAILURE":
      return false;
    default:
      return state;
  }
};

export const listsIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_LISTS_SUCCESS:
      return { ...state, lists: action.response.result };
    default:
      return state;
  }
};

export const placesById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LISTS_SUCCESS:
      return { ...state, lists: action.response.entities.places };
    default:
      return state;
  }
};

export const listsById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LISTS_SUCCESS:
      return { ...state, lists: action.response.entities.lists };
    default:
      return state;
  }
};
