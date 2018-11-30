import React from "react";
import { Layout, Menu } from "antd";
import { observer, inject } from "mobx-react";

const { Header, Content, Footer } = Layout;

@inject(stores => ({
  menu: stores.menu,
  user: stores.user
}))
@observer
class MCLayout extends React.Component {
  render() {
    const { children, menu, user } = this.props;
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <Header
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {/* <h1
            className="logo"
            style={{
              color: "#FFF",
              fontSize: 22,
              fontWeight: "normal",
              marginRight: 50
            }}
          >
            Juju Contract
          </h1> */}
          <img
            src={require("../static/images/logo.png")}
            alt="logo"
            style={{ width: 100, height: 40, marginRight: 50 }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[menu.index]}
            style={{ lineHeight: "64px", flex: 1 }}
          >
            <Menu.Item key="1">全部合同</Menu.Item>
            <Menu.Item key="2">待完成</Menu.Item>
            <Menu.Item key="3">已完成</Menu.Item>
          </Menu>
          <div
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end"
            }}
          >
            {user.isLogin ? (
              <React.Fragment>
                <h3
                  style={{
                    color: "#FFF",
                    fontSize: 12,
                    lineHeight: "100%",
                    margin: 0
                  }}
                >
                  {user.accounts[0]}
                </h3>
                <p
                  style={{
                    color: "#FFF",
                    fontSize: 10,
                    lineHeight: "100%",
                    margin: 0
                  }}
                >
                  {user.balanceInEther} ETH
                </p>
              </React.Fragment>
            ) : (
              <p style={{ color: "#FFF", margin: 0 }}>
                未登录，请检查chrome的Metamask是否已经登录。
              </p>
            )}
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          JuJu Contract ©2018 Created by JMMC In Guangzhou
        </Footer>
      </Layout>
    );
  }
}

export default MCLayout;
