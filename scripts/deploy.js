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
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) verify();
    
    
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
    if (e.messaage.toLowerCase().includes("already verifiea"))
      console.log("Already Verified");
    else console.log(e);
  }
};

main();
