const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pin4Ukraine", function () {
  it("Should not be able to mint when not configured", async function () {
    const Pin4Ukraine = await ethers.getContractFactory("Pin4Ukraine");
    const pins4ukraine = await Pin4Ukraine.deploy();
    await pins4ukraine.deployed();

    await expect(pins4ukraine.mint(1)).to.be.revertedWith("MINT_NOT_CONFIGURED");
  });

  it("Should not be able to mint too soon", async function () {
    const Pin4Ukraine = await ethers.getContractFactory("Pin4Ukraine");
    const pins4ukraine = await Pin4Ukraine.deploy();
    await pins4ukraine.deployed();

    const setMintOpenSinceTx = await pins4ukraine.setMintOpenSince(1654041600); // Jun 01 2022
    await setMintOpenSinceTx.wait();

    await ethers.provider.send("evm_mine", [1654041300]); // May 31 2022 23:55:00

    await expect(pins4ukraine.mint(1)).to.be.revertedWith("MINT_NOT_OPEN");
  });

  it("Should not be able to mint id 0", async function () {
    const Pin4Ukraine = await ethers.getContractFactory("Pin4Ukraine");
    const pins4ukraine = await Pin4Ukraine.deploy();
    await pins4ukraine.deployed();

    const setMintOpenSinceTx = await pins4ukraine.setMintOpenSince(1654041600); // Jun 01 2022
    await setMintOpenSinceTx.wait();

    await ethers.provider.send("evm_mine", [1654057200]); // Jun 01 2022

    await expect(pins4ukraine.mint(0)).to.be.revertedWith("INCORRECT_ID");
  });

  it("Should not be able to mint id 4", async function () {
    const Pin4Ukraine = await ethers.getContractFactory("Pin4Ukraine");
    const pins4ukraine = await Pin4Ukraine.deploy();
    await pins4ukraine.deployed();

    const setMintOpenSinceTx = await pins4ukraine.setMintOpenSince(1654041600); // Jun 01 2022
    await setMintOpenSinceTx.wait();

    // already there, because ganache uses shared network for all tests
    // await ethers.provider.send("evm_mine", [1654057200]) // Jun 01 2022

    await expect(pins4ukraine.mint(4)).to.be.revertedWith("INCORRECT_ID");
  });

  it("Should be able to mint id 1", async function () {
    const Pin4Ukraine = await ethers.getContractFactory("Pin4Ukraine");
    const pins4ukraine = await Pin4Ukraine.deploy();
    await pins4ukraine.deployed();

    const setMintOpenSinceTx = await pins4ukraine.setMintOpenSince(1654041600); // Jun 01 2022
    await setMintOpenSinceTx.wait();

    // already there, because ganache uses shared network for all tests
    // await ethers.provider.send("evm_mine", [1654057200]) // Jun 01 2022

    await pins4ukraine.mint(1, {
      value: ethers.utils.parseEther("1.0"),
    });

    const [owner] = await ethers.getSigners();
    expect(await pins4ukraine.balanceOf(owner.address, 1)).to.equal(1);
    expect(await pins4ukraine.balanceOf(owner.address, 3)).to.equal(0);
  });

  it("Should be able to mint id 3", async function () {
    const Pin4Ukraine = await ethers.getContractFactory("Pin4Ukraine");
    const pins4ukraine = await Pin4Ukraine.deploy();
    await pins4ukraine.deployed();

    const setMintOpenSinceTx = await pins4ukraine.setMintOpenSince(1654041600); // Jun 01 2022
    await setMintOpenSinceTx.wait();

    // already there, because ganache uses shared network for all tests
    // await ethers.provider.send("evm_mine", [1654057200]) // Jun 01 2022

    await pins4ukraine.mint(3, {
      value: ethers.utils.parseEther("1.0"),
    });

    const [owner] = await ethers.getSigners();
    expect(await pins4ukraine.balanceOf(owner.address, 3)).to.equal(1);
    expect(await pins4ukraine.balanceOf(owner.address, 1)).to.equal(0);
  });

  it("Should pass but not mint", async function () {
    const Pin4Ukraine = await ethers.getContractFactory("Pin4Ukraine");
    const pins4ukraine = await Pin4Ukraine.deploy();
    await pins4ukraine.deployed();

    const setMintOpenSinceTx = await pins4ukraine.setMintOpenSince(1654041600); // Jun 01 2022
    await setMintOpenSinceTx.wait();

    // already there, because ganache uses shared network for all tests
    // await ethers.provider.send("evm_mine", [1654057200]) // Jun 01 2022

    await pins4ukraine.mint(1, {
      value: ethers.utils.parseEther("0.000001"),
    });

    const [owner] = await ethers.getSigners();
    expect(await pins4ukraine.balanceOf(owner.address, 1)).to.equal(0);
  });

  it("Should not be able to mint too late", async function () {
    const Pin4Ukraine = await ethers.getContractFactory("Pin4Ukraine");
    const pins4ukraine = await Pin4Ukraine.deploy();
    await pins4ukraine.deployed();

    const setMintOpenSinceTx = await pins4ukraine.setMintOpenSince(1654041600); // Jun 01 2022
    await setMintOpenSinceTx.wait();

    await ethers.provider.send("evm_mine", [1654214400]); // Jun 03 2022

    await expect(pins4ukraine.mint(1)).to.be.revertedWith("MINT_CLOSED");
  });
});
