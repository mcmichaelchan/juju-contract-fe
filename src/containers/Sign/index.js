import React from "react";
import Loadable from "react-loadable";
import { inject, observer } from "mobx-react";
import { Spin, Divider, Tabs, Tag, Steps } from "antd";

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
        {contract.isLoading ? (
          <Spin />
        ) : (
          <React.Fragment>
            <Steps size="small" current={1} style={{ marginBottom: 60 }}>
              <Step title="填写合同基本信息" />
              <Step title="双方签名" />
              <Step title="完成" />
            </Steps>
            <section
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                margin: "50px 0 50px 0"
              }}
            >
              <div style={{ width: "40%", marginRight: "20%" }}>
                <Divider orientation="left">基本信息</Divider>
                <h5>
                  <b>合同名称 / </b>
                  {contract.detail["name"]}
                </h5>
                <h5>
                  <b>合同地址 / </b>
                  {this.props.match.params.id}
                </h5>

                <h5>
                  <b>甲方用户名 / </b>
                  {data[contract.detail["partyA"]]
                    ? data[contract.detail["partyA"]].username
                    : null}
                </h5>
                <h5>
                  <b>甲方地址 / </b>
                  {contract.detail["partyA"]}
                </h5>
                <h5>
                  <b>甲方地址 / </b>
                  {contract.detail["partyA"]}
                </h5>
                <h5>
                  <b>乙方用户名 / </b>
                  {data[contract.detail["partyB"]]
                    ? data[contract.detail["partyB"]].username
                    : null}
                </h5>
                <h5>
                  <b>乙方地址 / </b>
                  {contract.detail["partyB"]}
                </h5>
              </div>
              <div style={{ width: "40%" }}>
                <Divider orientation="left">签名记录</Divider>
                <SignTable
                  data={contract.signData}
                  isLoading={contract.isSigning}
                  onSign={() => {
                    contract.signContract(this.props.history);
                  }}
                />
              </div>
            </section>
            <section style={{ border: "solid 1px gainsboro" }}>
              <LaborContract
                partyA_name={
                  data[contract.detail["partyA"]]
                    ? data[contract.detail["partyA"]].username
                    : null
                }
                partyB_name={
                  data[contract.detail["partyB"]]
                    ? data[contract.detail["partyB"]].username
                    : null
                }
                {...contract.detail}
              />
            </section>
          </React.Fragment>
        )}
      </Layout>
    );
  }
}

export default Index;
