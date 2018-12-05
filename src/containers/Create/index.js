import React from "react";
import Loadable from "react-loadable";
import { observer, inject } from "mobx-react";
import { Steps } from "antd";

import data from "../../static/data/user";
import Loading from "../../components/Feedback/Loading";

const Layout = Loadable({
  loader: () => import("../../components/MCLayout"),
  loading: Loading,
  delay: 500
});

const Basic = Loadable({
  loader: () => import("./Basic"),
  loading: Loading,
  delay: 500
});

const Step = Steps.Step;

@inject(stores => ({
  menu: stores.menu,
  contract: stores.contract
}))
@observer
class Index extends React.Component {
  componentDidMount() {
    this.props.menu.changeIndex("0");
  }
  render() {
    const { contract } = this.props;
    return (
      <Layout style={{ padding: 60 }} history={this.props.history}>
        <Steps size="small" current={0} style={{ marginBottom: 60 }}>
          <Step title="填写合同基本信息" />
          <Step title="双方签名" />
          <Step title="完成" />
        </Steps>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Basic history={this.props.history} />
        </div>
      </Layout>
    );
  }
}

export default Index;
