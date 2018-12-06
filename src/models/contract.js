import { action, autorun, observable, computed } from "mobx";
import getContractList from "../utils/getContractList";
import getContract from "../utils/getContract";
import { message } from "antd";

import user from "./user";

class contractSotre {
  @observable address = "";
  @observable isLoading = false;
  @observable detail = {};
  @observable status = 0;
  @observable isCreating = false;
  @observable history = [];
  @observable sign = [];
  @action.bound
  async initDetail(address) {
    this.address = address;
    this.isLoading = true;
    try {
      const detail = await getContract(this.address)
        .methods.getDetail()
        .call();
      console.log(detail);
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
      console.log(this.sign, "what");
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
}

const store = new contractSotre();

export default store;
