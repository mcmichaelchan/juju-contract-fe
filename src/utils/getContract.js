import web3 from "./web3";
import LaborContract from "../static/contracts/LaborContract.json";

const getContract = address =>
  new web3.eth.Contract(JSON.parse(LaborContract.interface), address);

export default getContract;
