async function main() {
  // const contract = await ethers.getContractFactory("Workable").then(f => f.deploy()).then(c => c.deployed());
  // console.log(`Workable deployed at:\n${contract.address}`);

  const registry = await ethers.getContractFactory("KeeperRegistry").then(f => f.deploy()).then(c => c.deployed());
  console.log(`Sample keep3r registry deployed at:\n${registry.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
