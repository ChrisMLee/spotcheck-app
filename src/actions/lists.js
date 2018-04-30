import { normalize } from "normalizr";
import { list } from "./schema";
import { v4 } from "node-uuid";
import { getListById } from "../lib/store-queries";

const FETCH_LISTS_REQUEST = "FETCH_LISTS_REQUEST";
const FETCH_LISTS_SUCCESS = "FETCH_LISTS_SUCCESS";
const FETCH_LISTS_FAILURE = "FETCH_LISTS_FAILURE";

const CREATE_LIST_SUCCESS = "CREATE_LIST_SUCCESS";
const DELETE_LIST_SUCCESS = "DELETE_LIST_SUCCESS";
const UPDATE_LIST_SUCCESS = "UPDATE_LIST_SUCCESS";
const ADD_PLACE = "ADD_PLACE";

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
  setTimeout(
    () =>
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
        .catch(err => console.log("err", err)),
    500
  );
};

export const createList = ({ title, created_by }) => (dispatch, getState) => {
  dispatch({
    type: CREATE_LIST_SUCCESS,
    response: {
      title: title,
      created_by: created_by,
      id: v4(),
      places: []
    }
  });
};

export const updateList = ({ listId, place }) => (dispatch, getState) => {
  // TODO: later what this should really do is make a PUT and update with the completed object
  // because you're actually anticipating getting an object that you have to normalize again
  const newPlace = {
    name: place.name,
    rating: place.rating,
    id: v4()
  };
  dispatch({ type: ADD_PLACE, response: newPlace });
  const list = getListById(getState(), listId);
  const updatedList = {
    ...list,
    places: list.places.concat(newPlace.id)
  };
  dispatch({
    type: UPDATE_LIST_SUCCESS,
    response: updatedList
  });
};

export const deleteList = id => (dispatch, getState) => {
  dispatch({
    type: DELETE_LIST_SUCCESS,
    id
  });
};

export const listsIsFetching = (state = false, action) => {
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
      return action.response.result;
    case CREATE_LIST_SUCCESS:
      return [...state, action.response.id];
    case DELETE_LIST_SUCCESS:
      const indexOfList = state.indexOf(action.id);
      return [...state.slice(0, indexOfList), ...state.slice(indexOfList + 1)];
    default:
      return state;
  }
};

export const listsById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LISTS_SUCCESS:
      return action.response.entities.lists;
    case CREATE_LIST_SUCCESS:
      return { ...state, [action.response.id]: action.response };
    case UPDATE_LIST_SUCCESS:
      return { ...state, [action.response.id]: action.response };
    case DELETE_LIST_SUCCESS:
      // destructuring: pulling out the key/value pair you want to get rid of and only keeping the rest (restOfState)
      const { [String(action.id)]: deletedValue, ...restOfState } = state;
      return restOfState;
    default:
      return state;
  }
};

export const placesById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LISTS_SUCCESS:
      return action.response.entities.places;
    case ADD_PLACE:
      return { ...state, [action.response.id]: action.response };
    default:
      return state;
  }
};
