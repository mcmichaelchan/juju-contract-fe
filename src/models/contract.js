import { action, autorun, observable, computed } from "mobx";
import getContractList from "../utils/getContractList";
import getContract from "../utils/getContract";

import user from "./user";

import moment from "moment";

class contractSotre {
  @observable address = "";
  @observable isLoading = false;
  @observable detail = {};
  @observable status = 0;
  @action.bound
  async initDetail(address) {
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
        "name"
      ];
      key.forEach((item, index) => {
        this.detail[item] = detail[index];
      });
      console.log(this.detail);
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  async createContract(config) {
    try {
      console.log("hi");
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
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}

const store = new contractSotre();

export default store;
