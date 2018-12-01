import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Loading from "./components/Feedback/Loading";

const Dashboard = Loadable({
  loader: () => import("./containers/Dashboard"),
  loading: Loading,
  delay: 500
});

const Detail = Loadable({
  loader: () => import("./containers/Detail"),
  loading: Loading,
  delay: 500
});

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/detail/:id" component={Detail} />
    </Switch>
  </Router>
);
