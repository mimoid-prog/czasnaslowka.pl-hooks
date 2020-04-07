import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "pages/Home";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
