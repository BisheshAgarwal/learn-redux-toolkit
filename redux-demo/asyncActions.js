const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFail = (error) => {
  return {
    type: FETCH_USERS_FAIL,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAIL:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchUsersRequest());
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      // response.data is the users
      const users = response.data.map((user) => user.id);
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      // error.message is the error message
      dispatch(fetchUsersFail(error.message));
    }
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
