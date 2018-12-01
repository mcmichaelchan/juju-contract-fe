import React from "react";
import Loadable from "react-loadable";
import { inject, observer } from "mobx-react";
import { Spin, Card, Row, Col } from "antd";

import web3 from "../../utils/web3";
import Loading from "../../components/Feedback/Loading";

const Layout = Loadable({
  loader: () => import("../../components/MCLayout"),
  loading: Loading,
  delay: 500
});

@inject(stores => ({
  user: stores.user,
  contracts: stores.contracts
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
      this.props.contracts.initContractList();
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { contracts } = this.props;
    console.log(window.innerWidth);
    return (
      <Layout>
        {contracts.isLoadingContract ? (
          <Spin />
        ) : (
          <div>
            <Row type="flex" justify="flex-start">
              {Object.keys(contracts.contractList).map((key, index) => (
                <Col key={`${index}-card`}>
                  <Card
                    title={key}
                    extra={<a href="#">详情</a>}
                    style={{
                      width: 300,
                      marginRight: (index + 1) % 3 === 0 ? 0 : 50
                    }}
                  >
                    <p>
                      <b>甲方单位 / </b>
                      {contracts.contractList[key]["partyA_name"]}
                    </p>
                    <p>
                      <b>职位 / </b>
                      {contracts.contractList[key]["job"]}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Layout>
    );
  }
}

export default Index;
