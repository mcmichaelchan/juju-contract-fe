import web3 from "./web3";
import LaborContractList from "../static/contracts/LaborContractList.json";
import address from "../static/contracts/address.json";

const getContract = new web3.eth.Contract(
  JSON.parse(LaborContractList.interface),
  address
);

export default getContract;
