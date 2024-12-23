require('dotenv').config();

const { ethers } = require('hardhat')
const fs = require('fs')


async function deployContract() {
  let contract
  const servicePct = 5

  try {
    contract = await ethers.deployContract('DappEventX', [servicePct])
    await contract.waitForDeployment()

    console.log('Contracts deployed successfully.')
    return contract
  } catch (error) {
    console.error('Error deploying contracts:', error)
    throw error
  }
}

// async function deployContract() {
//   const [deployer] = await ethers.getSigners(); // Get the first signer (deployer account)

//   console.log(`Deploying contracts with the account: ${deployer.address}`);
  
//   const servicePct = 5;

//   try {
//     const ContractFactory = await ethers.getContractFactory('DappEventX', deployer); // Attach the signer here
//     const contract = await ContractFactory.deploy(servicePct); // Deploy the contract
//     await contract.deployed(); // Wait for deployment to complete

//     console.log('Contract deployed successfully at:', contract.address);
//     return contract;
//   } catch (error) {
//     console.error('Error deploying contracts:', error);
//     throw error;
//   }
// }

async function saveContractAddress(contract) {
  try {
    const address = JSON.stringify({ dappEventXContract: contract.target }, null, 4)

    fs.writeFile('./contracts/contractAddress.json', address, 'utf8', (error) => {
      if (error) {
        console.error('Error saving contract address:', err)
      } else {
        console.log('Deployed contract address:', address)
      }
    })
  } catch (error) {
    console.error('Error saving contract address:', error)
    throw error
  }
}

async function main() {
  try {
    const contract = await deployContract()
    await saveContractAddress(contract)

    console.log('Contract deployment completed successfully.')
  } catch (error) {
    console.error('Unhandled error:', error)
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error)
  process.exitCode = 1
})