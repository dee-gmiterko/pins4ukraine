const hre = require("hardhat");

async function main() {
  const Pins4Ukraine = await hre.ethers.getContractFactory("Pins4Ukraine");
  const pins4ukraine = await Pins4Ukraine.deploy();
  await pins4ukraine.deployed();

  console.log("Pins4Ukraine deployed to:", pins4ukraine.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
