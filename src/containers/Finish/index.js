import React from "react";
import Loadable from "react-loadable";
import { inject, observer } from "mobx-react";
import { Spin, Button, Tabs, Steps } from "antd";

import data from "../../static/data/user";
import Loading from "../../components/Feedback/Loading";
import SignTable from "../../components/Display/SignTable";

const Layout = Loadable({
  loader: () => import("../../components/MCLayout"),
  loading: Loading,
  delay: 500
});

const LaborContract = Loadable({
  loader: () => import("../../components/Display/LaborContract"),
  loading: Loading,
  delay: 500
});

const TabPane = Tabs.TabPane;
const Step = Steps.Step;

@inject(stores => ({
  menu: stores.menu,
  contract: stores.contract
}))
@observer
class Index extends React.Component {
  componentDidMount() {
    this.props.menu.changeIndex("0");
    this.props.contract.initDetail(this.props.match.params.id);
  }
  render() {
    const { contract } = this.props;
    return (
      <Layout history={this.props.history}>
        <Steps size="small" current={2} style={{ marginBottom: 60 }}>
          <Step title="填写合同基本信息" />
          <Step title="双方签名" />
          <Step title="完成" />
        </Steps>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={require("../../static/images/success.jpeg")}
            alt="success-img"
            style={{ width: 400 }}
          />
          <h4 style={{ marginTop: 20, fontSize: 20, color: "rgba(0,0,0,0.5)" }}>
            恭喜您，双方已完成签署
          </h4>
          <Button
            type="primary"
            onClick={() =>
              this.props.history.push(`/detail/${this.props.match.params.id}`)
            }
          >
            马上去看看
          </Button>
        </section>
      </Layout>
    );
  }
}

export default Index;
