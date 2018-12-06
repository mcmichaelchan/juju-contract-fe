import { action, autorun, observable, computed } from "mobx";
import getContractList from "../utils/getContractList";
import getContract from "../utils/getContract";

class contractsSotre {
  @observable contractList = {};
  @observable isLoadingContract = false;
  @action.bound
  async initContractList(status) {
    try {
      this.isLoadingContract = true;
      this.contractList = {};
      const projectLists = await getContractList.methods.getContracts().call();
      console.log(projectLists);
      const summaryList = await Promise.all(
        projectLists.map(address =>
          getContract(address)
            .methods.getSummary()
            .call()
        )
      );
      const keyList = ["job", "partyA", "partyB", "name", "status"];
      summaryList.forEach((item, sIndex) => {
        let contractConverted = {};
        keyList.forEach((key, kIndex) => {
          contractConverted[key] = summaryList[sIndex][kIndex];
        });
        if (
          status === "all" ||
          (status === "pending" && contractConverted.status === "sign") ||
          (status === "finished" && contractConverted.status === "finish")
        ) {
          this.contractList[projectLists[sIndex]] = contractConverted;
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoadingContract = false;
    }
  }
}

const store = new contractsSotre();

export default store;
