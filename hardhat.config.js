// require("@nomicfoundation/hardhat-toolbox");

// module.exports = {
//   defaultNetwork: 'localhost',
//   networks: {
//     hardhat: {},
//     localhost: {
//       url: 'http://127.0.0.1:8545',
//     },
//   },
//   solidity: {
//     version: '0.8.17',
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
//   mocha: {
//     timeout: 40000,
//   },
// }

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    avalanche: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      chainId: 43114,
      gasPrice: 225000000000,
      accounts: [process.env.PRIVATE_KEY]
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      gasPrice: 225000000000,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000,
  },
}