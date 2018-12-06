import React from "react";
import { Layout, Menu, Avatar, Row, Col } from "antd";
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
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: 1050,
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
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
              <Menu.Item
                key="1"
                onClick={() => {
                  this.props.history.push("/contracts/all");
                  this.props.menu.changeIndex("1");
                }}
              >
                全部合同
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  this.props.history.push("/contracts/pending");
                  this.props.menu.changeIndex("2");
                }}
              >
                待完成
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  this.props.history.push("/contracts/finished");
                  this.props.menu.changeIndex("3");
                }}
              >
                已完成
              </Menu.Item>
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
                <Row type="flex">
                  <Col>
                    <Avatar
                      style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf"
                      }}
                    >
                      {user.username.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      flexDirection: "column",
                      marginLeft: 6
                    }}
                  >
                    <h3
                      style={{
                        color: "#FFF",
                        fontSize: 16,
                        lineHeight: "140%",
                        margin: 0
                      }}
                    >
                      {user.username}
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
                  </Col>
                </Row>
              ) : (
                <p style={{ color: "#FFF", margin: 0 }}>
                  未登录，请检查chrome的Metamask是否已经登录。
                </p>
              )}
            </div>
          </div>
        </Header>
        <Content
          style={{
            padding: "0 50px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            style={Object.assign(
              {},
              {
                background: "#fff",
                padding: 24,
                minHeight: 280,
                width: 1050,
                marginTop: 50
              },
              this.props.style
            )}
          >
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
