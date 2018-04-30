import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { spotcheckApp } from "../reducers";
import { loadAuthtoken } from "./localStorage";

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }
  const persistedToken = loadAuthtoken();
  return createStore(
    spotcheckApp,
    persistedToken,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
