import { action, autorun, observable, computed } from "mobx";
import getContractList from "../utils/getContractList";
import getContract from "../utils/getContract";

class contractSotre {
  @observable address = "";
  @observable isLoading = false;
  @observable detail = {};
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
}

const store = new contractSotre();

export default store;
