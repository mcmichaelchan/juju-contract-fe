import React from "react";
import Loadable from "react-loadable";
import { inject, observer } from "mobx-react";
import { Spin, Card, Row, Col, Button } from "antd";

import data from "../../static/data/user";
import Loading from "../../components/Feedback/Loading";

const Layout = Loadable({
  loader: () => import("../../components/MCLayout"),
  loading: Loading,
  delay: 500
});

@inject(stores => ({
  contracts: stores.contracts,
  menu: stores.menu
}))
@observer
class Index extends React.Component {
  componentDidMount() {
    this.props.contracts.initContractList();
    this.props.menu.changeIndex("1");
  }
  render() {
    const { contracts } = this.props;
    return (
      <Layout history={this.props.history}>
        {contracts.isLoadingContract ? (
          <Spin />
        ) : (
          <div>
            <Row type="flex" justify="end" style={{ marginBottom: 20 }}>
              <Col>
                <Button type="primary">新建合同</Button>
              </Col>
            </Row>
            <Row type="flex" justify="flex-start">
              {Object.keys(contracts.contractList).map((key, index) => {
                return (
                  <Col key={`${index}-card`}>
                    <Card
                      title={`与${
                        data[contracts.contractList[key]["partyB"]].username
                      }的合同`}
                      extra={
                        <a
                          onClick={() => {
                            this.props.history.push(`/detail/${key}`);
                            this.props.menu.changeIndex("0");
                          }}
                        >
                          详情
                        </a>
                      }
                      style={{
                        width: 300,
                        marginRight: (index + 1) % 3 === 0 ? 0 : 50
                      }}
                    >
                      <p>
                        <b>甲方单位 / </b>
                        {data[contracts.contractList[key]["partyA"]].username}
                      </p>
                      <p>
                        <b>乙方单位 / </b>
                        {data[contracts.contractList[key]["partyB"]].username}
                      </p>
                      <p>
                        <b>职位 / </b>
                        {contracts.contractList[key]["job"]}
                      </p>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </Layout>
    );
  }
}

export default Index;
