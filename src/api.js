import axios from "axios";

export default {
  user: {
    login: (credentials) =>
      axios.post("/api/auth", { credentials }).then((res) => res.data),
    signup: (user) =>
      axios.post("/api/users", { user }).then((res) => res.data),
    confirm: (token) =>
      axios
        .post("/api/auth/confirmation", { token })
        .then((res) => res.data.user),
    resetPasswordRequest: (email) =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: (token) => axios.post("/api/auth/validate_token", { token }),
    resetPassword: (data) => axios.post("/api/auth/reset_password", { data }),
  },
  userSets: {
    fetchUserSet: (id) =>
      axios
        .post("/api/user_sets/fetch_user_set", { id })
        .then((res) => res.data.set),
    fetchUserSets: () =>
      axios.post("/api/user_sets/fetch_user_sets").then((res) => res.data.sets),
    createSet: (set) =>
      axios.post("/api/user_sets/create_set", { set }).then((res) => res.data),
    updateSet: (set) =>
      axios.post("/api/user_sets/update_set", { set }).then((res) => res.data),
    removeSet: (id) =>
      axios
        .post("/api/user_sets/remove_set", { id })
        .then((res) => res.data.sets),
  },
  publicSets: {
    fetchPublicSet: (id) =>
      axios
        .post("/api/public_sets/fetch_public_set", { id })
        .then((res) => res.data.set),
    fetchPublicSets: (language) =>
      axios
        .post("/api/public_sets/fetch_public_sets", { language })
        .then((res) => res.data.sets),
  },
  languages: {
    fetchLanguages: () =>
      axios
        .post("/api/languages/fetch_languages")
        .then((res) => res.data.languages),
  },
};
