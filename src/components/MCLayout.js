import React from "react";
import { Layout, Menu } from "antd";
import { observer, inject } from "mobx-react";

const { Header, Content, Footer } = Layout;

@inject(stores => ({
  menu: stores.menu
}))
@observer
class MCLayout extends React.Component {
  render() {
    const { children, menu } = this.props;
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
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">全部合同</Menu.Item>
            <Menu.Item key="2">待完成</Menu.Item>
            <Menu.Item key="3">已完成</Menu.Item>
          </Menu>
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
