const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  compilers: {
    solc: {
      version: '0.8.0',
      parser: 'solcjs'
    }
  },
  contracts_build_directory: path.join(__dirname, "../frontend/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
    testnet: {
      networkCheckTimeout: 10000,
      host: "test.confluxrpc.com",     // Conflux provides public RPC services for testnet
      port: 80,
      network_id: 1,       // Conflux testnet networkId is 1
      privateKeys: [privateKey]  //  Adding the account private key used for sending transactions
    },
  }
};
