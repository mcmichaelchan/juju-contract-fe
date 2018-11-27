import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = Loadable({
  loader: () => import("./containers/App"),
  loading: () => <p>正在加载...</p>
});

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </Router>
);
