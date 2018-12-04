import React from "react";
import Loadable from "react-loadable";
import { observer, inject } from "mobx-react";
import { Spin, Divider, Tabs } from "antd";

import data from "../../../static/data/user";
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
class Finish extends React.Component {
  render() {
    return (
      <Layout>
        <p>创建</p>
      </Layout>
    );
  }
}

export default Finish;
