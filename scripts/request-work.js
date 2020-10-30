const workableAddr = '0xB4d258b63b1937e3442BD98Db745750E05432f37';

async function main() {
  const contract = await ethers.getContractFactory("Workable").then(f => f.attach(workableAddr));
  const tx = await contract.requestWork().then(t => t.wait());
  console.log(`Requested work for Workable contract`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
