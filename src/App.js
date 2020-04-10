import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";
import ForgotPassword from "pages/ForgotPassword";
import StartLearning from "pages/StartLearning";
import GuestRoute from "components/routes/GuestRoute";
import UserRoute from "components/routes/UserRoute";
import Learning from "pages/Learning";

function App() {
  return (
    <div>
      <Switch>
        <GuestRoute exact path="/">
          <Home />
        </GuestRoute>
        <GuestRoute path="/logowanie">
          <Login />
        </GuestRoute>
        <GuestRoute path="/rejestracja">
          <Signup />
        </GuestRoute>
        <GuestRoute path="/przypomnienie-hasla">
          <ForgotPassword />
        </GuestRoute>
        <Route path="/zacznij-nauke">
          <StartLearning />
        </Route>
        <Route path="/nauka">
          <Learning />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
