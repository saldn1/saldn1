import { expect } from "chai";
import { ethers } from "hardhat";

describe("PawPatrol", function () {
  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("PawPatrol");

    const instance = await ContractFactory.deploy();
    await instance.deployed();

    expect(await instance.name()).to.equal("PawPatrol");
  });
});
