const { utils } = require("ethers");

async function main() {

    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("claimContract");

    console.log('test');
    // Deploy contract with the correct constructor arguments
    const contract = await contractFactory.deploy("0x3aeB7f8a538E59a343cF9E67A839Cc457336c52D");
    console.log('test2');
    // Wait for this transaction to be mined
    await contract.deployed();
    console.log('test3');
    // Get contract address
    console.log("Contract deployed to:", contract.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
