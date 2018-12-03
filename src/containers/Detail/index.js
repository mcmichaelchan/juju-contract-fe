import React from "react";
import Loadable from "react-loadable";
import { inject, observer } from "mobx-react";
import { Spin, Divider, Tabs } from "antd";

import data from "../../static/data/user";
import Loading from "../../components/Feedback/Loading";

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

  callBack = e => {
    console.log(e);
  };
  render() {
    const { contract } = this.props;
    console.log(data, contract.detail["partyA"]);
    return (
      <Layout history={this.props.history}>
        {contract.isLoading ? (
          <Spin />
        ) : (
          <React.Fragment>
            <h2>{contract.detail["name"]}</h2>
            <div style={{ width: "40%", margin: "50px 0 50px 0" }}>
              <Divider orientation="left">基本信息</Divider>
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
            <Tabs
              defaultActiveKey="1"
              onChange={this.callback}
              style={{ height: 510 }}
            >
              <TabPane tab="操作记录" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="合同原文" key="2" style={{}}>
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
              </TabPane>
            </Tabs>
          </React.Fragment>
        )}
      </Layout>
    );
  }
}

export default Index;
