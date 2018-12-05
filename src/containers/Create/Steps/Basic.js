import React from "react";
import { observer, inject } from "mobx-react";
import { Form, Input, Select, DatePicker, Button } from "antd";

import data from "../../../static/data/user";

const FormItem = Form.Item;
const Option = Select.Option;

@inject(stores => ({
  user: stores.user,
  contract: stores.contract
}))
@observer
class Basic extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.contract.createContract(values);
      }
    });
  };
  _renderOptions = () => {
    return Object.keys(data).map((address, index) => (
      <Option value={address} key={"user." + index}>
        {data[address]}
      </Option>
    ));
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const { getFieldDecorator } = this.props.form;
    const provinceData = ["Zhejiang", "Jiangsu"];
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{ width: "50%" }}
      >
        <FormItem {...formItemLayout} label="甲方">
          <span className="ant-form-text">
            {data[this.props.user.accounts[0]]
              ? data[this.props.user.accounts[0]].username
              : ""}
          </span>
        </FormItem>
        <FormItem {...formItemLayout} label="乙方">
          {getFieldDecorator("partyB", {
            rules: [{ required: true, message: "请选择乙方" }]
          })(
            <Select placeholder="请选择乙方">
              <Option value="0xE97aB6A40a5f126076e524d984C4Ce426d9C0F40">
                jmmc公司
              </Option>
              <Option value="0x1a6cD6003BE2F25293230bdB52981762b00752A8">
                michael
              </Option>
              <Option value="0xB80Cd42c0Fd3BA19C5094833db6a592407316346">
                米高
              </Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="合同名称">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入合同名称" }]
          })(<Input placeholder="合同名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="职位">
          {getFieldDecorator("job", {
            rules: [{ required: true, message: "请输入职位" }]
          })(<Input placeholder="职位" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="薪酬">
          {getFieldDecorator("salary", {
            rules: [{ required: true, message: "请输入薪酬" }]
          })(<Input placeholder="薪酬" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="合同开始时间">
          {getFieldDecorator("start_date", {
            rules: [{ required: true, message: "请输入合同开始时间" }]
          })(<DatePicker style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="合同结束时间">
          {getFieldDecorator("end_date", {
            rules: [{ required: true, message: "请输入合同结束时间" }]
          })(<DatePicker style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            确定创建
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedBasic = Form.create()(Basic);

export default WrappedBasic;
