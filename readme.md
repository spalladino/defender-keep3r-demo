# Demo scripts for Defender integration with keep3r.network

This repo has two scripts that demo the integration of Defender relayers and autotasks with the keep3r.demo. Note that these scripts **do not interact with the actual keep3r network**, but with test contracts deployed on Rinkeby that emulate it. The code should be equivalent for mainnet, but with different addresses. 

Scripts are based on the [`YearnV1EarnKeeper`](https://github.com/keep3r-network/keep3r.network/blob/bf23fe7019529073fd4c4c00ac542cfbd89cd52f/scripts/YearnV1EarnKeeper.js) script from the keep3r.network repository.

## Setup

This requires a Defender free account, with a Rinkeby relayer set up. Take note of the relayer address, api key, and secret.

Checkout the repo and install dependencies:

```
$ git clone https://github.com/spalladino/defender-keep3r-demo.git
$ cd defender-keep3r-demo
$ npm install
```

Create an `.env` environment file:

```
RINKEBY_PUBLIC_ADDR=0xa.... // Address of the rinkeby relayer
INFURA_PROJECT_ID=25.... // Create an Eth project at infura: https://infura.io/
API_KEY=Eq..... // API key of the relayer
API_SECRET=FW....... // API secret of the relayer
```

## Demos

The `simple-keeper` will just run the fake keep3r job:

```sh
$ npm run simple-keeper
```

The `autoregister-keeper` will first go through a fake cycle of staking and activation before running the actual jobs:

```sh
$ npm run autoregister-keeper
```
