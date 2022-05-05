const hre = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const now = Math.floor(Date.now() / 1000);

  const Pins4Ukraine = await hre.ethers.getContractFactory("Pins4Ukraine");
  const pins4ukraine = Pins4Ukraine.attach(process.env.GATSBY_SMART_CONTRACT);

  await pins4ukraine.setOpenDesigns(1, 6);
  await pins4ukraine.setMintOpenSince(now);

  console.log("Contract configured.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});