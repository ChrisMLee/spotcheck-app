const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT_REQUEST = "LOGOUT_REQUEST";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

/*
 TODO: localstorage should handle this as part of app load
 isAuthenticated: localStorage.getItem('id_token') ? true : false
*/

/*
  isFetching: true,
  isAuthenticated: false,
  user: action.creds
  errorMessage: ''
*/

/*
export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: "FETCH_TODOS_REQUEST",
    filter
  });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: "FETCH_TODOS_SUCCESS",
        filter,
        response
      });
    },
    error => {
      dispatch({
        type: "FETCH_TODOS_FAILURE",
        filter,
        message: error.message || "Something went wrong."
      });
    }
  );
};
*/

// TODO: better control flow, error handling here
export const loginUser = ({ email, password }) => (dispatch, getState) => {
  dispatch({
    type: LOGIN_REQUEST,
    creds: { email, password }
  });

  const config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=chimpBanana@dm.com&password=1234`
  };
  //  body: `email=${email}&password=${password}`

  fetch(`http://localhost:3001/auth/login`, config)
    .then(
      response =>
        response.json().then(({ auth_token }) => {
          localStorage.setItem("auth_token", auth_token);
          dispatch({
            type: LOGIN_SUCCESS
          });
        }),
      error => {
        dispatch({
          type: LOGIN_FAILURE,
          message: error.message || "Something went wrong."
        });
      }
    )
    .catch(err => console.log("err", err));
};

export const logoutUser = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT_REQUEST
  });
  localStorage.removeItem("auth_token");
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export const reducer = (state = true, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ""
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
