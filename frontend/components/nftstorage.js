const abi = require('../contracts/contract-abi.json');
const { Conflux } = require("js-conflux-sdk");

export const mintNFT = async (url) => {

    //error handling
    if (url.trim() == "") {
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
    }

    //make nft storage call
    const tokenURI = url;

    const cfx = await Conflux.create({ url: "https://test.confluxrpc.com", logger: console })
    const me = cfx.wallet.addPrivateKey(process.env.Privatekey);

    const contract = cfx.Contract({ address: "cfxtest:acaj40uw90hk63ty08ptdz3ragb1bgbwgjwdj4hpry", abi })
    let supply = await contract.totalSupply();

    try {
        const receipt = await contract.mint(me.address, supply + 1, tokenURI).sendTransaction({ from: me.address, "gasPrice": 1000 }).executed();
        return {
            success: true,
            status: "✅ Check out your transaction on Conflux Scan: https://testnet.confluxscan.io/transaction/" + receipt.transactionHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }
};