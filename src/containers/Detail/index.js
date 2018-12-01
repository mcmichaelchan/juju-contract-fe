import React from "react";
import Loadable from "react-loadable";
import { inject, observer } from "mobx-react";
import { Spin, Card, Row, Col, Button } from "antd";

import data from "../../static/data/user";
import web3 from "../../utils/web3";
import Loading from "../../components/Feedback/Loading";
import store from "../../models/menu";

const Layout = Loadable({
  loader: () => import("../../components/MCLayout"),
  loading: Loading,
  delay: 500
});

@inject(stores => ({
  menu: stores.menu,
  contracts: stores.contracts
}))
@observer
class Index extends React.Component {
  componentDidMount() {
    this.props.menu.changeIndex("0");
  }
  render() {
    const { contracts } = this.props;
    return (
      <Layout history={this.props.history}>
        <h2>{this.props.match.params.id}</h2>
      </Layout>
    );
  }
}

export default Index;
