const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKey = "726832fff479d5ac00d85e369350d0355dc7a8addc9352e4e387db49ccecba05";
const endpointUrl = "https://kovan.infura.io/v3/1bc882e29c314e0fb6f78aa2c94922f2";

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
    testnet: {
     networkCheckTimeout: 10000,
     host: "test.confluxrpc.com",     // Conflux provides public RPC services for testnet
     port: 80,
     network_id: 1,       // Conflux testnet networkId is 1
     privateKeys: ["9d2c1dc41f209792f8af782f1afcaa2bfc54dd2d67a40722143cd5b36224ffab"]  //  Adding the account private key used for sending transactions
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          //private keys array
          [privateKey],
          //url to ethereum node
          endpointUrl
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    }
  },
};
