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
import MyProfile from "pages/MyProfile";
import MySets from "pages/MySets";
import Activation from "pages/Activation";
import ResetPassword from "pages/ResetPassword";

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
        <GuestRoute path="/aktywacja/:token">
          <Activation />
        </GuestRoute>
        <GuestRoute path="/przypomnienie-hasla">
          <ForgotPassword />
        </GuestRoute>
        <Route path="/zmiana-hasla/:token">
          <ResetPassword />
        </Route>
        <Route path="/zacznij-nauke">
          <StartLearning />
        </Route>
        <Route path="/nauka">
          <Learning />
        </Route>
        <UserRoute path="/moj-profil">
          <MyProfile />
        </UserRoute>
        <UserRoute path="/moje-zestawy">
          <MySets />
        </UserRoute>
      </Switch>
    </div>
  );
}

export default App;
