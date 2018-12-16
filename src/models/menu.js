import { action, autorun, observable, computed } from "mobx";

class menuSotre {
  @observable index = "1"; //string
  @action.bound
  changeIndex(newIndex) {
    this.index = newIndex;
  }
}

const store = new menuSotre();

export default store;
