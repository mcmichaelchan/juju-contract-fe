import React, { Component } from "react";
import Web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);
const accounts = web3.eth.getAccounts();

(async () => {
  const result = await accounts;
  console.log(result[0]);
})();

const App = props => {
  return <div className="App">敬请期待喇</div>;
};

export default App;
