const CDNFT = artifacts.require("CDNFT");

module.exports = function (deployer) {
  deployer.deploy(CDNFT, "Conflux Developer NFT", "CDNFT", "ipfs://");
};
