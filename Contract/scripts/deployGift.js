const hre = require("hardhat");

async function main() {

    let addressPiggy;

    // const MockTokenFactory = await hre.ethers.getContractFactory("MyToken");
    // const mockToken = await MockTokenFactory.deploy();
    // await mockToken.waitForDeployment(); 

    // const mockToken2 = await MockTokenFactory.deploy();
    // await mockToken2.waitForDeployment(); 

    // console.log("MockToken deployed to:", await mockToken.getAddress());
    // console.log("MockToken2 deployed to:", await mockToken2.getAddress());

    // const token1 = await mockToken.getAddress();

    // const token2 = await mockToken2.getAddress();

    const PiggyFactory = await hre.ethers.getContractFactory("GiftCardContract");
    const USDC = "0x19EeaDcBA1801Afec43e87Cefcd4239E13fc294d"
    const owner = "0x8822F2965090Ddc102F7de354dfd6E642C090269"

    const piggyFactory = await PiggyFactory.deploy(USDC, owner);

    await piggyFactory.waitForDeployment();

    console.log("GiftCardContract deployed to:", await piggyFactory.getAddress());
  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});