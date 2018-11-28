import React from "react";
import ReactDOM from "react-dom";
import { Provider, observer } from "mobx-react";

import models from "./models";
import MainRouter from "./MainRouter";

@observer
class Index extends React.Component {
  componentDidMount() {
    // 未来mobx-persist
    // const hydrate = create();
    // // const { user } = stores;
    // hydrate("store user", stores.user).then(data => {
    //   if (data.isLogin) {
    //     // nav.init()
    //   }
    // });
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
