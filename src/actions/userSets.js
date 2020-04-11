import { SETS_FETCHED } from "types";
import api from "api";

export const setsFetched = (data) => ({
  type: SETS_FETCHED,
  data,
});

export const fetchUserSet = (id) => () => api.userSets.fetchUserSet(id);

export const fetchUserSets = () => (dispatch) =>
  api.userSets.fetchUserSets().then((data) => dispatch(setsFetched(data)));

export const createSet = (set) => (dispatch) =>
  api.userSets.createSet(set).then((data) => dispatch(setsFetched(data)));

export const updateSet = (set) => (dispatch) =>
  api.userSets.updateSet(set).then((data) => dispatch(setsFetched(data)));

export const removeSet = (id) => (dispatch) =>
  api.userSets.removeSet(id).then((data) => dispatch(setsFetched(data)));
