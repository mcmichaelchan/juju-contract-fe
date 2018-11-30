import React from "react";
import Loadable from "react-loadable";
import { inject, observer } from "mobx-react";

import web3 from "../../utils/web3";
import Loading from "../../components/Feedback/Loading";

const Layout = Loadable({
  loader: () => import("../../components/MCLayout"),
  loading: Loading,
  delay: 500
});

@inject(stores => ({
  user: stores.user
}))
@observer
class Index extends React.Component {
  async componentDidMount() {
    try {
      let accounts = await web3.eth.getAccounts();
      let balances = await Promise.all(
        accounts.map(x => web3.eth.getBalance(x))
      );
      this.props.user.initUser(accounts, balances);
      console.log(accounts, balances);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <Layout>
        <div>正在开发哦</div>
      </Layout>
    );
  }
}

export default Index;
