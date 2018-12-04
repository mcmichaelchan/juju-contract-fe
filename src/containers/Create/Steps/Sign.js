import React from "react";
import Loadable from "react-loadable";
import { observer, inject } from "mobx-react";
import { Spin, Divider, Tabs } from "antd";

import Loading from "../../../components/Feedback/Loading";

const Layout = Loadable({
  loader: () => import("../../../components/MCLayout"),
  loading: Loading,
  delay: 500
});

@inject(stores => ({
  menu: stores.menu,
  contract: stores.contract
}))
@observer
class Sign extends React.Component {
  render() {
    return (
      <Layout>
        <p>创建</p>
      </Layout>
    );
  }
}

export default Sign;
