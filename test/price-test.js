const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pins4Ukraine", function () {
  it("Should fail before", async function () {
    const Pins4Ukraine = await ethers.getContractFactory("Pins4Ukraine");
    const pins4ukraine = await Pins4Ukraine.deploy();
    await pins4ukraine.deployed();

    await expect(pins4ukraine.tokenPriceAt(1652014400)).to.be.revertedWith("Minting not open yet");
  });

  it("Should start at 0.01", async function () {
    const Pins4Ukraine = await ethers.getContractFactory("Pins4Ukraine");
    const pins4ukraine = await Pins4Ukraine.deploy();
    await pins4ukraine.deployed();

    const price = await pins4ukraine.tokenPriceAt(1652054400);
    expect(ethers.utils.formatEther(price)).to.equal("0.01");
  });

  it("Should be small at half", async function () {
    const Pins4Ukraine = await ethers.getContractFactory("Pins4Ukraine");
    const pins4ukraine = await Pins4Ukraine.deploy();
    await pins4ukraine.deployed();

    const price = await pins4ukraine.tokenPriceAt(1659916800);
    expect(ethers.utils.formatEther(price)).to.equal("0.07");
  });

  it("Should end at 0.5", async function () {
    const Pins4Ukraine = await ethers.getContractFactory("Pins4Ukraine");
    const pins4ukraine = await Pins4Ukraine.deploy();
    await pins4ukraine.deployed();

    const price = await pins4ukraine.tokenPriceAt(1667779199);
    expect(ethers.utils.formatEther(price)).to.equal("0.5");
  });

  it("Should fail after", async function () {
    const Pins4Ukraine = await ethers.getContractFactory("Pins4Ukraine");
    const pins4ukraine = await Pins4Ukraine.deploy();
    await pins4ukraine.deployed();

    await expect(pins4ukraine.tokenPriceAt(1667779200)).to.be.revertedWith("Minting already closed");
  });

});
