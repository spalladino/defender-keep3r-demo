require('dotenv').config();

const registryAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"keeper","type":"address"},{"indexed":false,"internalType":"uint256","name":"block","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"activated","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bond","type":"uint256"}],"name":"KeeperBonded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"keeper","type":"address"},{"indexed":false,"internalType":"uint256","name":"block","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"active","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bond","type":"uint256"}],"name":"KeeperBonding","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"keeper","type":"address"},{"indexed":false,"internalType":"uint256","name":"block","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"deactive","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bond","type":"uint256"}],"name":"KeeperUnbonding","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"keeper","type":"address"},{"indexed":false,"internalType":"uint256","name":"block","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"deactivated","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bond","type":"uint256"}],"name":"KeeperUnbound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"credit","type":"address"},{"indexed":true,"internalType":"address","name":"job","type":"address"},{"indexed":true,"internalType":"address","name":"keeper","type":"address"},{"indexed":false,"internalType":"uint256","name":"block","type":"uint256"}],"name":"KeeperWorked","type":"event"},{"inputs":[],"name":"BOND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LIQUIDITYBOND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNBOND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"bonding","type":"address"}],"name":"activate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"blacklist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"bonding","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"bond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"bondings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"bonds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"firstSeen","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getKeepers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"keeper","type":"address"}],"name":"isKeeper","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"keeperList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"keepers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastJob","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"partialUnbonding","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"pendingbonds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBonded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"bonding","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unbond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"unbondings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"votes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"bonding","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const workableAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"worker","type":"address"}],"name":"Worked","type":"event"},{"inputs":[],"name":"requestWork","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"work","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"workable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

const registryAddr = '0x08829D79f73e0a152a9AB5ee0fa955091055d46F';
const workableAddr = '0xB4d258b63b1937e3442BD98Db745750E05432f37';
const from = process.env.RINKEBY_PUBLIC_ADDR;

const collateralAddr = '0x08829D79f73e0a152a9AB5ee0fa955091055d46F';
const collateralAmount = '0x0de0b6b3a7640000';

const { ethers } = require("ethers");
const { DefenderRelaySigner } = require('defender-relay-client/lib/ethers');

async function workIfNeeded(contract) {
  if (await contract.workable()) {
    const tx = await contract.work();
    console.log(`Worked ${contract.address}:`, tx.hash);
  } else {
    console.log(`No work needed for ${contract.address}`);
  }
}

// Entrypoint for the Autotask
exports.handler = async function(credentials) {
  const provider = ethers.getDefaultProvider('rinkeby');
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fastest', from });
  const registry = new ethers.Contract(registryAddr, registryAbi, signer);
  const contract = new ethers.Contract(workableAddr, workableAbi, signer);

  // Work if is a registered keeper
  if (await registry.isKeeper(from)) {
    return await workIfNeeded(contract);
  }

  // Otherwise run through bonding and activation process
  const bonding = await registry.bondings(from, collateralAddr).then(b => b.toNumber());
  if (bonding === 0) {
    const tx = await registry.bond(collateralAddr, collateralAmount);
    console.log(`Bonded relayer: ${tx.hash}`);
  } else if (bonding < Date.now() / 1000) {
    const tx = await registry.activate(collateralAddr);
    console.log(`Activated relayer: ${tx.hash}`);
    await workIfNeeded(contract);
  } else {
    console.log(`Waiting ${bonding - parseInt(Date.now() / 1000)} seconds until activation is available`);
  }
}

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
  exports.handler({ apiKey, apiSecret })
    .then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}