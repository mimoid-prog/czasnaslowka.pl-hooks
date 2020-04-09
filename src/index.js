import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "styles/global.css";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import decode from "jwt-decode";
import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "setAuthorizationHeader";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.czasnaslowkaJWT) {
  const payload = decode(localStorage.czasnaslowkaJWT);
  const user = {
    token: localStorage.czasnaslowkaJWT,
    email: payload.email,
    confirmed: payload.confirmed,
    creationDate: payload.creationDate,
  };

  setAuthorizationHeader(localStorage.czasnaslowkaJWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
