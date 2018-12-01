import { action, autorun, observable, computed } from "mobx";
import getContractList from "../utils/getContractList";
import getContract from "../utils/getContract";

class contractsSotre {
  @observable contractList = {};
  @observable isLoadingContract = false;
  @action.bound
  async initContractList() {
    try {
      this.isLoadingContract = true;
      const projectLists = await getContractList.methods.getContracts().call();
      const summaryList = await Promise.all(
        projectLists.map(address =>
          getContract(address)
            .methods.getSummary()
            .call()
        )
      );
      const keyList = [
        "partyA_name",
        "start_time",
        "end_time",
        "salary",
        "job",
        "partyA"
      ];
      summaryList.forEach((item, sIndex) => {
        let contractConverted = {};
        keyList.forEach((key, kIndex) => {
          contractConverted[key] = summaryList[sIndex][kIndex];
        });
        this.contractList[projectLists[sIndex]] = contractConverted;
      });
      console.log(this.contractList);
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoadingContract = false;
    }
  }
}

const store = new contractsSotre();

export default store;
