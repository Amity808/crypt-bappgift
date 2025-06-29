const hre = require("hardhat");

const main = async () => {

    const [owner, otherAccount] = await ethers.getSigners();

    let addressPiggy;

    const MockTokenFactory = await hre.ethers.getContractFactory("MyToken");
    const mockToken = await MockTokenFactory.deploy();
    await mockToken.waitForDeployment(); 

    const mockToken2 = await MockTokenFactory.deploy();
    await mockToken2.waitForDeployment(); 

    console.log("MockToken deployed to:", await mockToken.getAddress());
    console.log("MockToken2 deployed to:", await mockToken2.getAddress());

    const token1 = await mockToken.getAddress();

    const token2 = await mockToken2.getAddress();

    await mockToken.mint(owner.address, hre.ethers.parseEther("100000"));
    await mockToken.mint(otherAccount.address, hre.ethers.parseEther("1000"));
    const PiggyFactory = await hre.ethers.getContractFactory("PiggyFactory");

    const piggyFactory = await PiggyFactory.deploy();

    await piggyFactory.waitForDeployment();

    console.log("PiggyFactory deployed to:", await piggyFactory.getAddress());

    const deployPiggyBankInstance = await piggyFactory.connect(otherAccount).deployPiggy("School fee", token1, token2);
    const receipt = await deployPiggyBankInstance.wait(); 

    const event = receipt.logs.find(async (log) => log.address === await piggyFactory.getAddress());

    console.log("Event:", event);

    if (event) {
        const parsedLog = piggyFactory.interface.parseLog(event);
        console.log("PiggyBank deployed at:", parsedLog.args[0]); 
        addressPiggy = parsedLog.args[0];
    } else {
        console.log("No event emitted. Check contract execution.");
    }

    const PiggyContract = await hre.ethers.getContractFactory("PiggyBank");

    const piggyBank = await PiggyContract.attach(addressPiggy);

    console.log("PiggyBank deployed to:", await piggyBank.getAddress());

    const purpose = await piggyBank.purpose();

    console.log("Purpose of the PiggyBank:", purpose);

    await mockToken.connect(otherAccount).approve(addressPiggy, hre.ethers.parseEther('100'));

    const withDeadline = 2 * 60 * 60;

    const deposit = await piggyBank.connect(otherAccount).deposit(token1, hre.ethers.parseEther("10"), 2);

    await deposit.wait();

    console.log("Deposit Transaction successfully");

    const balanceAfterDeposit = await mockToken.balanceOf(otherAccount.address);
    const formatBalanceAfterDeposit = hre.ethers.formatEther(balanceAfterDeposit);
    console.log("Balance of owner after deposit:", formatBalanceAfterDeposit);


    const blockStamp = await hre.ethers.provider.getBlock("latest");

    console.log("Block number:", blockStamp.timestamp);

    const deadlineCheck = await piggyBank.deadline()

    console.log("Deadline check:", deadlineCheck);

    const deadline = blockStamp.timestamp + 3 * 60 * 60;

    console.log("New deadline:", deadline);

    const fastForwardTime = blockStamp.timestamp + 3 * 60 * 60

    await hre.network.provider.send("evm_increaseTime", [fastForwardTime]);

    await hre.network.provider.send("evm_mine");


    console.log("Time fast-forwarded by:", fastForwardTime, "seconds");


    // const withdraw = await piggyBank.connect(otherAccount).withdraw(token1);
    // await withdraw.wait();

    // console.log("Withdrawal Transaction successfully");

    // const balance = await mockToken.balanceOf(otherAccount.address);
    // const formatBalance = hre.ethers.formatEther(balance);

    // console.log("Balance of owner:", formatBalance);

    // // checking it piggy is active after withdrawn

    // const active = await piggyBank.isActive();

    // console.log("Piggy is active:", active);

    //////////
    //////// using emergency withdraw 
    ///////

    const piggyBalanceBeforWithdraw = await piggyBank.balance();
    console.log("Piggy Balance:",  hre.ethers.parseEther(await piggyBalanceBeforWithdraw.toString()))
    const withdraw = await piggyBank.connect(otherAccount).emergencyWithdraw(token1);
    await withdraw.wait();

    console.log("Withdrawal Transaction successfully");

    const balance = await mockToken.balanceOf(otherAccount.address);
    const formatBalance = hre.ethers.formatEther(balance);

    console.log("Balance of owner:", formatBalance);

    // checking it piggy is active after withdrawn

    const active = await piggyBank.isActive();

    console.log("Piggy is active:", active);



}

main().then(() => {
    console.log("Success!");
    process.exit(0);
}).catch((err) => {console.log(err)

process.exit(1);});