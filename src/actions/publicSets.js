import api from "api";

export const fetchPublicSet = (id) => () => api.publicSets.fetchPublicSet(id);

export const fetchPublicSets = () => () => api.publicSets.fetchPublicSets();
