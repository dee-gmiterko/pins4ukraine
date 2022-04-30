const hre = require("hardhat");

async function main() {
  const now = Math.floor(Date.now() / 1000);

  const Pins4Ukraine = await hre.ethers.getContractFactory("Pins4Ukraine");
  const pins4ukraine = await Pins4Ukraine.deploy();

  await pins4ukraine.deployed();

  await pins4ukraine.setOpenDesigns(1, 6);
  await pins4ukraine.setMintOpenSince(now);

  console.log("Pins4Ukraine deployed to:", pins4ukraine.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
