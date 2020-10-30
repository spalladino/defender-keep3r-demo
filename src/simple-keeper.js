const workableAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"worker","type":"address"}],"name":"Worked","type":"event"},{"inputs":[],"name":"requestWork","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"work","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"workable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];
const workableAddr = '0xB4d258b63b1937e3442BD98Db745750E05432f37';
const from = '0x2e51e0bd78af0e4cddb062c0bc456be0793c51af';

const { ethers } = require("ethers");
const { DefenderRelaySigner } = require('defender-relay-client/lib/ethers');

// Entrypoint for the Autotask
exports.handler = async function(credentials) {
  const provider = ethers.getDefaultProvider('rinkeby');
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fastest', from });
  const contract = new ethers.Contract(workableAddr, workableAbi, signer);

  // Run work if needed
  if (await contract.workable()) {
    const tx = await contract.work();
    console.log(tx.hash);
  }
}

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  require('dotenv').config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
  exports.handler({ apiKey, apiSecret })
    .then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}