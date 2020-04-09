import { USER_LOGGED_IN, USER_LOGGED_OUT } from "types";
import api from "api";
import setAuthorizationHeader from "setAuthorizationHeader";

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const login = (credentials) => (dispatch) =>
  api.user.login(credentials).then((res) => {
    if (res.user) {
      localStorage.czasnaslowkaJWT = res.user.token;
      setAuthorizationHeader(res.user.token);
      dispatch(userLoggedIn(res.user));
    }
    return res;
  });

export const logout = () => (dispatch) => {
  localStorage.removeItem("czasnaslowkaJWT");
  dispatch(userLoggedOut());
};

export const confirm = (token) => (dispatch) =>
  api.user.confirm(token).then((user) => user);

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = (token) => () => api.user.validateToken(token);

export const resetPassword = (data) => () => api.user.resetPassword(data);
