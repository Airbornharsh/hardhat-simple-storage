const { ethers, run, network } = require("hardhat");

const main = async () => {
  try {
    const SimpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    );
    console.log("Deploying contract");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contract to ${simpleStorage.address}`);
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
      await simpleStorage.deployTransaction.wait(6);
      await verify(simpleStorage.address, []);
    }
    console.log("Step4");

    const currentValue = await simpleStorage.retrieve();
    console.log("Current Value is: ", currentValue);

    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log("Updated Value is:", updatedValue);
  } catch (e) {
    console.log(e);
  }
};

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      contructorArguments: args,
    });
  } catch (e) {
    if (e.messaage.toLowerCase().includes("already verified"))
      console.log("Already Verified");
    else console.log(e);
  }
};

main();
