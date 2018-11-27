import React, { Component } from "react";
import Web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);
const accounts = web3.eth.getAccounts();

(async () => {
  const result = await accounts;
  console.log(result[0]);
})();

class App extends Component {
  render() {
    return <div className="App">app</div>;
  }
}

export default App;
