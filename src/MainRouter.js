import React from "react";
import Loadable from "react-loadable";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

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

const Create = Loadable({
  loader: () => import("./containers/Create"),
  loading: Loading,
  delay: 500
});

const Sign = Loadable({
  loader: () => import("./containers/Sign"),
  loading: Loading,
  delay: 500
});

const Finish = Loadable({
  loader: () => import("./containers/Finish"),
  loading: Loading,
  delay: 500
});

export default () => (
  <Router>
    <Switch>
      <Route exact path="/contracts/:status" component={Dashboard} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/sign/:id" component={Sign} />
      <Route exact path="/success/:id" component={Finish} />
      <Route exact path="/create" component={Create} />
      <Redirect from="/" to="/contracts/all" />
    </Switch>
  </Router>
);
