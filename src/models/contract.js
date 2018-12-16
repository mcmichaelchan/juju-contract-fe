import { action, observable, computed } from "mobx";
import getContractList from "../utils/getContractList";
import getContract from "../utils/getContract";
import { message } from "antd";

import user from "./user";
import data from "../static/data/user";

class contractSotre {
  @observable address = "";
  @observable isLoading = false;
  @observable detail = {};
  @observable status = 0;
  @observable isCreating = false;
  @observable history = [];
  @observable sign = [];
  @observable isSigning = false;
  @action.bound
  getSignHistory() {
    return new Promise(async (res, rej) => {
      try {
        const signLength = await getContract(this.address)
          .methods.getSignHistoryLength()
          .call();
        this.sign = [];
        for (let i = 0; i < signLength; i++) {
          const sign = await getContract(this.address)
            .methods.getSignHistory(i)
            .call();
          this.sign.push({ signer: sign[0], time: sign[1] });
        }
        res();
      } catch (err) {
        console.log(err);
        rej();
      }
    });
  }
  @action.bound
  async initDetail(address, history = null, isSignPage = false) {
    this.address = address;
    this.isLoading = true;
    try {
      const detail = await getContract(this.address)
        .methods.getDetail()
        .call();
      const key = [
        "startDate",
        "endDate",
        "salary",
        "job",
        "partyA",
        "partyB",
        "name",
        "status"
      ];
      key.forEach((item, index) => {
        this.detail[item] = detail[index];
      });
      if (isSignPage) {
        if (this.detail.status === "finish") {
          history.push(`/success/${this.address}`);
          return;
        }
      }
      const historyLength = await getContract(this.address)
        .methods.getHistoryLength()
        .call();
      this.history = [];
      for (let i = 0; i < historyLength; i++) {
        const history = await getContract(this.address)
          .methods.getHistory(i)
          .call();
        this.history.push({
          operator: history[0],
          time: history[1],
          type: history[2],
          content: history[3]
        });
      }
      await this.getSignHistory();
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }
  @action.bound
  async createContract(config, history) {
    try {
      this.isCreating = true;
      const result = await getContractList.methods
        .createLaborContract(
          config.start_date.format("x"),
          config.end_date.format("x"),
          Number(config.salary),
          config.job,
          config.partyB,
          config.name
        )
        .send({ from: user.accounts[0], gas: "5000000" });
      const projectLists = await getContractList.methods.getContracts().call();
      message.success("创建成功", 2);
      history.push(`/sign/${projectLists[projectLists.length - 1]}`);
    } catch (err) {
      message.error(err.message, 2);
    } finally {
      this.isCreating = false;
    }
  }

  @action.bound
  async signContract(history) {
    try {
      this.isSigning = true;
      const result = await getContract(this.address)
        .methods.sign()
        .send({ from: user.accounts[0], gas: "5000000" });
      await this.getSignHistory();
      if (this.sign.length === 2) {
        // 如果双方都已经签名成功
        history.push(`/success/${this.address}`);
      } else {
        message.success("签名成功", 2);
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.isSigning = false;
    }
  }

  @computed
  get signData() {
    let result = [
      {
        id: "甲方",
        user: data[this.detail["partyA"]]
          ? data[this.detail["partyA"]].username
          : ""
      },
      {
        id: "乙方",
        user: data[this.detail["partyB"]]
          ? data[this.detail["partyB"]].username
          : ""
      }
    ];
    let signUser = this.sign.map(item => item.signer);
    //首先确定用户是哪一方
    let userIsA = this.detail["partyA"] === user.accounts[0];
    if (userIsA) {
      result[0].status =
        signUser.indexOf(this.detail["partyA"]) === -1 ? "ready" : "finish";
      result[1].status =
        signUser.indexOf(this.detail["partyB"]) === -1 ? "waiting" : "finish";
    } else {
      result[0].status =
        signUser.indexOf(this.detail["partyA"]) === -1 ? "waiting" : "finish";
      result[1].status =
        signUser.indexOf(this.detail["partyB"]) === -1 ? "ready" : "finish";
    }
    //判断sign纪录里面有没有用户
    return result;
  }
}

const store = new contractSotre();

export default store;
