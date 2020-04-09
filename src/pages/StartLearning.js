import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import MainLayout from "components/layouts/MainLayout";

const StartLearning = () => {
  let match = useRouteMatch();
  return (
    <MainLayout>
      <Switch>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </MainLayout>
  );
};

export default StartLearning;
