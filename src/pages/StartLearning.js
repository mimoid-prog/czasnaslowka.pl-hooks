import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MainLayout from "components/layouts/MainLayout";
import SetsAndLanguages from "components/elements/startLearning/SetsAndLanguages";
import Mode from "components/elements/startLearning/Mode";
import Categories from "components/elements/startLearning/Categories";
import "components/elements/startLearning/startLearning.css";

const StartLearning = () => {
  let match = useRouteMatch();
  return (
    <MainLayout>
      <div className="start-learning">
        <div className="container">
          <div className="start-learning-content">
            <Switch>
              <Route exact path={match.path}>
                <SetsAndLanguages />
              </Route>
              <Route path={`${match.path}/tryb`}>
                <Mode />
              </Route>
              <Route path={`${match.path}/kategorie`}>
                <Categories />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StartLearning;
