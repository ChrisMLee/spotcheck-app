import { combineReducers } from "redux";
import { reducer as auth } from "../actions/auth";
import {
  listsIsFetching,
  listsIds,
  placesById,
  listsById
} from "../actions/lists";

export const spotcheckApp = combineReducers({
  auth,
  listsIsFetching,
  listsIds,
  placesById,
  listsById
});
