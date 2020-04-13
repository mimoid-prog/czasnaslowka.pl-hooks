import api from "api";

export const fetchPublicSet = (id) => () => api.publicSets.fetchPublicSet(id);

export const fetchPublicSets = (language) => () =>
  api.publicSets.fetchPublicSets();
