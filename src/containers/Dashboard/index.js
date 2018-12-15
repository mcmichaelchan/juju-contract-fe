import React from "react";
import Loadable from "react-loadable";
import { inject, observer } from "mobx-react";
import { Spin, Card, Row, Col, Button, Tag } from "antd";

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
    this.props.contracts.initContractList(this.props.match.params.status);
    switch (this.props.match.params.status) {
      case "all": {
        this.props.menu.changeIndex("1");
        break;
      }
      case "pending": {
        this.props.menu.changeIndex("2");
        break;
      }
      case "finished": {
        this.props.menu.changeIndex("3");
        break;
      }
      default:
        break;
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.status !== this.props.match.params.status) {
      this.props.contracts.initContractList(newProps.match.params.status);
    }
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
              {this.props.match.params.status === "all" ? (
                <Col>
                  <Button
                    type="primary"
                    onClick={() => this.props.history.push("/create")}
                  >
                    新建合同
                  </Button>
                </Col>
              ) : null}
            </Row>
            <Row type="flex" justify="flex-start">
              {Object.keys(contracts.contractList).length > 0 ? (
                Object.keys(contracts.contractList)
                  .reverse()
                  .map((key, index) => {
                    return (
                      <Col key={`${index}-card`}>
                        <Card
                          title={contracts.contractList[key]["name"]}
                          extra={
                            <div>
                              <Tag
                                color={
                                  contracts.contractList[key]["status"] ===
                                  "sign"
                                    ? "orange"
                                    : "green"
                                }
                              >
                                {contracts.contractList[key]["status"] ===
                                "sign"
                                  ? "待完成"
                                  : "已完成"}
                              </Tag>
                              <a
                                onClick={() => {
                                  if (
                                    contracts.contractList[key]["status"] ===
                                    "sign"
                                  ) {
                                    this.props.history.push(`/sign/${key}`);
                                  } else {
                                    this.props.history.push(`/detail/${key}`);
                                  }

                                  this.props.menu.changeIndex("0");
                                }}
                              >
                                详情
                              </a>
                            </div>
                          }
                          style={{
                            width: 300,
                            marginRight: (index + 1) % 3 === 0 ? 0 : 50,
                            marginBottom: 40
                          }}
                        >
                          <p>
                            <b>甲方单位 / </b>
                            {
                              data[contracts.contractList[key]["partyA"]]
                                .username
                            }
                          </p>
                          <p>
                            <b>乙方单位 / </b>
                            {
                              data[contracts.contractList[key]["partyB"]]
                                .username
                            }
                          </p>
                          <p>
                            <b>职位 / </b>
                            {contracts.contractList[key]["job"]}
                          </p>
                        </Card>
                      </Col>
                    );
                  })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <img
                    src={require("../../static/images/blank.png")}
                    alt="blank-img"
                    style={{ width: 200 }}
                  />
                  <h4
                    style={{
                      color: "rgba(0,0,0,0.5)",
                      fontSize: 20,
                      marginTop: 20
                    }}
                  >
                    暂时没有合同
                  </h4>
                </div>
              )}
            </Row>
          </div>
        )}
      </Layout>
    );
  }
}

export default Index;
