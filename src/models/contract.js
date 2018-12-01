import { action, autorun, observable, computed } from "mobx";
import getContractList from "../utils/getContractList";
import getContract from "../utils/getContract";

class contractSotre {
  @observable address = "";
  @action.bound
  setAddress(address) {
    this.address = address;
  }
}

const store = new contractSotre();

export default store;
