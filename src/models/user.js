import { action, autorun, observable, computed } from "mobx";
import web3 from "../utils/web3";
import user from "../static/data/user";

class userSotre {
  @observable accounts = []; //string
  @observable balance = []; //string
  @action.bound
  initUser(accounts, balance) {
    this.accounts = accounts;
    this.balance = balance;
  }
  @computed
  get balanceInEther() {
    if (this.accounts.length > 0) {
      return web3.utils.fromWei(this.balance[0], "ether");
    }
    return 0;
  }
  @computed
  get isLogin() {
    return this.accounts.length > 0;
  }
  @computed
  get username() {
    return user[this.accounts[0]].username;
  }
}

const store = new userSotre();

export default store;
