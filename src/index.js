import React from "react";
import ReactDOM from "react-dom";
import { Provider, observer, inject } from "mobx-react";
import ReactGA from "react-ga";

import web3 from "./utils/web3";
import models from "./models";
import MainRouter from "./MainRouter";
import user from "./models/user";

class Index extends React.Component {
  async componentDidMount() {
    try {
      let accounts = await web3.eth.getAccounts();
      let balances = await Promise.all(
        accounts.map(x => web3.eth.getBalance(x))
      );
      user.initUser(accounts, balances);
    } catch (err) {
      console.log(err);
    }
    ReactGA.initialize("UA-130204701-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Provider {...models}>
        <MainRouter />
      </Provider>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
