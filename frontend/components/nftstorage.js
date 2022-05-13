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
    const me = cfx.wallet.addPrivateKey("0xf507bf529f870fff107fee93220a7f0516d90914c3510d53ac08e8b723c64f0a");
    //const me = cfx.wallet.addPrivateKey('0x9d2c1dc41f209792f8af782f1afcaa2bfc54dd2d67a40722143cd5b36224ffab')

    const contract = cfx.Contract({ address: "cfxtest:acaj40uw90hk63ty08ptdz3ragb1bgbwgjwdj4hpry", abi })
    let supply = await contract.totalSupply();
    //console.log(contract)

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