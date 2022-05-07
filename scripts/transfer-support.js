const hre = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const Pins4Ukraine = await hre.ethers.getContractFactory("Pins4Ukraine");
  const pins4ukraine = Pins4Ukraine.attach(process.env.GATSBY_SMART_CONTRACT);

  await pins4ukraine.transferSupport();
  // await pins4ukraine.transferSupportERC20("")

  console.log("Support transfered.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
