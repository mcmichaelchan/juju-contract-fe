import React from "react";
import { Table, Modal, Tag, Spin } from "antd";

const confirm = Modal.confirm;

export default class SignTable extends React.Component {
  handleSign = () => {
    console.log(this.props);
    confirm({
      title: "合同签名",
      content: "是否确定签署该合同？该操作无法反悔哦～",
      onOk: () => {
        this.props.onSign();
      },
      onCancel() {}
    });
  };
  render() {
    const columns = [
      {
        title: "身份",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "用户",
        dataIndex: "user",
        key: "user"
      },
      {
        title: "签名",
        key: "action",
        render: (text, record) => {
          if (record.status === "finish") {
            return <Tag color="green">已签名</Tag>;
          }
          if (record.status === "waiting") {
            return <Tag color="gold">等待对方签名</Tag>;
          }
          return (
            <span>
              {this.props.isLoading ? (
                <Spin />
              ) : (
                <a href="javascript:;" onClick={this.handleSign}>
                  马上签名
                </a>
              )}
            </span>
          );
        }
      }
    ];
    return (
      <Table
        dataSource={this.props.data}
        columns={columns}
        pagination={false}
      />
    );
  }
}
