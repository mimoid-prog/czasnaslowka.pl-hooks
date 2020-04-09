import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";
import ForgotPassword from "pages/ForgotPassword";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/logowanie">
          <Login />
        </Route>
        <Route path="/rejestracja">
          <Signup />
        </Route>
        <Route path="/przypomnienie-hasla">
          <ForgotPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
