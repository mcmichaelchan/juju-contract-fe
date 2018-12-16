// 往 ContractList 合约实例中写入示例数据
const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const ProjectList = require("../static/contracts/LaborContractList.json");
const address = require("../static/contracts/address.json");

const web3 = new Web3(
  new HDWalletProvider(
    "ladder nerve fancy regular hair pattern clerk place foot now coffee truck",
    "https://rinkeby.infura.io/v3/a88f10fd48d845e7a1ee4f7211f4d06a"
  )
);
const contract = new web3.eth.Contract(
  JSON.parse(ProjectList.interface),
  address
);

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  const contracts = [
    {
      partyA_name: "jmc公司",
      startDate: new Date().getTime(),
      endDate: new Date().getTime() + 2000000,
      salary: 8000,
      job: "运维"
    },
    {
      partyA_name: "jmc公司",
      startDate: new Date().getTime() + 123232,
      endDate: new Date().getTime() + 4000000,
      salary: 8000,
      job: "前端"
    }
  ];
  console.log(contracts);
  const owner = accounts[0];
  let oldNonce = 0;
  web3.eth.getTransactionCount(owner, (err, res) => {
    oldNonce = res;
  });
  const results = await Promise.all(
    contracts.map(x =>
      contract.methods
        .createLaborContract(
          x.partyA_name,
          x.startDate,
          x.endDate,
          x.salary,
          x.job
        )
        .send({ from: owner, gas: "400000" })
    )
  );

  console.log(results);
})();
