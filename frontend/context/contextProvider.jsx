import React, { useEffect, useState } from "react";
import Link from "next/link";
import FundraiserFactor from '../contracts/FundraiserFactory.json';
import FundraiserContract from '../contracts/Fundraiser.json';
import getWeb3 from "./getWeb3";
import {
  ConnectButton,
  useNotification,
} from "web3uikit";
const { Conflux, Drip } = require('js-conflux-sdk');

const cc = require('cryptocompare');

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const cfx = new Conflux({
    url: "https://test.confluxrpc.com",
    networkId: 1
  });

  const [currentAccount, setCurrentAccount] = useState("");
  const [factoryContract, setFactoryContract] = useState(null);
  const [ funds, setFunds ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ Contract, setContract] = useState(null)
  const [ fundName, setFundname ] = useState(null)
  const [ description, setDescription ] = useState(null)
  const [ totalDonations, setTotalDonations ] = useState(null)
  const [ imageURL, setImageURL ] = useState(null)
  const [ url, setURL ] = useState(null)
  const [ open, setOpen] = React.useState(false);
  const [ donationAmount, setDonationAmount] = useState(null)
  const [ exchangeRate, setExchangeRate ] = useState(null)
  const [ userDonations, setUserDonations ] = useState(null)
  const [ Owner, setIsOwner ] = useState(false)
  const [ modalLoading, setModalLoading ] = useState(true);
  const [ beneficiary, setNewBeneficiary ] = useState('')
  const [nftimage, setImage] = useState('');
  const [game, setGame] = useState('');
  
  const handleGame = (newGame) => {
    setGame(newGame);
  };
  const handleImage = (img) => {
    setImage(img);
  };

  useEffect(() => {
    const getadd = async () => {
      try{
        const acct = cfx.wallet.addPrivateKey('0xf507bf529f870fff107fee93220a7f0516d90914c3510d53ac08e8b723c64f0a')
        //const contract = cfx.Contract({ abi: FundraiserFactor.abi, bytecode: FundraiserFactor.bytecode })
        //const txReceipt = await contract.constructor().sendTransaction({ from: acct }).executed()
        //console.log(txReceipt);
        const contrac = await cfx.Contract({ abi: FundraiserFactor.abi, address: "cfxtest:aca855fctap4ptfyn0aak58a9t9279pjfeb0ymf6vk" })
        setContract(contrac);
        const res = await contrac.fundraisers(10, 0).call({ from: acct });
        setFunds(res)
        setLoading(false)
      }catch(error){
        console.log(error)
      }
    }
    getadd();
  }, [])
  

  const dispatch = useNotification();

  const handleNewNotification = () => {
    dispatch({
      type: "error",
      message: "Pleaser Connect Your Crypto Wallet",
      title: "Not Authenticated",
      position: "topL",
    });
  };

  const handleNewFundraiser = () => {
    dispatch({
      type: "success",
      message: "Fundraiser Created",
      title: "New Fundraiser",
      position: "topR",
    });
  };

  const handleDonation = () => {
    dispatch({
      type: "success",
      message: `You have successfully donated $ ${donationAmount} USD to the fundraiser`,
      title: "Donated",
      position: "topL",
    });
  };

  const handleNewBeneficiary = () => {
    dispatch({
      type: "success",
      message: `You have successfully changed the beneficary`,
      title: "New Beneficiary",
      position: "topL",
    });
  };

  const handleWithdraw = () => {
    dispatch({
      type: "success",
      message: `You have successfully withdrawn your funds`,
      title: "Withdraw",
      position: "topL",
    });
  };

  const handleNotEnuogh = () => {
    dispatch({
      type: "error",
      message: `Sorry you do not have enuogh fund to make this transaction`,
      title: "Not enuogh fund",
      position: "topL",
    });
  };

  // get a fundraiser details
  const getAfundraiser = async (fund) => {
    try {
      const acct = cfx.wallet.addPrivateKey('0xf507bf529f870fff107fee93220a7f0516d90914c3510d53ac08e8b723c64f0a')
      const instance = await cfx.Contract({ abi: FundraiserContract.abi, address: fund })

      const name = await instance.name().call({ from: acct })
      const description = await instance.description().call({ from: acct })
      const totalDonations = await instance.totalDonations().call({ from: acct })
      const imageURL = await instance.imageURL().call({ from: acct })
      const url = await instance.url().call({ from: acct })

      setFundname(name)
      setDescription(description)
      setImageURL(imageURL)
      setURL(url)

      const userDonations = await instance.myDonations().call({ from: acct })
      const exchangeRate = await cc.price('CFX', ['USD'])
      setExchangeRate(exchangeRate.USD)
      const CFXToken = Drip.fromGDrip(totalDonations).toString();
      const dollarDonationAmount = exchangeRate.USD * CFXToken
      setTotalDonations(dollarDonationAmount.toFixed(2))

      setUserDonations(userDonations)

      const isOwner = await instance.owner().call({ from: acct })
      console.log(isOwner)

      if (isOwner === currentAccount) {
        setIsOwner(true)
      }
      setModalLoading(false)
    }
    catch(error) {
      console.error(error);
    }
  }

  const getFundraiserDetails = (fundraiser) => {
    getAfundraiser(fundraiser);
  }
 
  const ethAmount = (donationAmount / exchangeRate || 0).toFixed(4)

// submit donation
  const submitFunds = async () => {
    const cfxRate = exchangeRate
    const cfxTotal = donationAmount / cfxRate

    try {
      const donation = Drip.fromGDrip(cfxTotal).toString();

      const tx = await Contract.donate().send({
        from: currentAccount,
        value: donation,
        gas: 650000
      })
      handleDonation();
    } catch(error) {
      handleNotEnuogh();
      console.log("submit Donation error", error);
  }
  }
 

  //render MyDonations
  const renderDonationsList = () => {
    var donations = userDonations
    if (donations === null) {return null}

    const totalDonations = donations.values.length
    let donationList = []
    var i
    for (i = 0; i < totalDonations; i++) {
      const ethAmount = web3.utils.fromWei(donations.values[i])
      const userDonation = exchangeRate * ethAmount
      const donationDate = donations.dates[i]
      donationList.push({ donationAmount: userDonation.toFixed(2), date: donationDate})
    }

    return donationList.map((donation) => {
      return (
        <div className="mt-3 flex justify-between">
          <p className="mr-4 mt-4 donationAmount">${donation.donationAmount}</p>
          <Link className="donation-receipt-link" href={{ pathname: '/receipts', query: { fund: fundName, donation: donation.donationAmount, date: donation.date} }}>
            <button
              type="button"
              className="flex flex-row justify-center items-center mr-2 bg-[#2952e3] p-3 rounded-lg cursor-pointer hover:bg-[#2546bd]"
              >
                <p className="text-white text-base font-semibold">
                  Request Receipt
                </p>
              </button>
          </Link>
        </div>
      )
    })
  }

  //withdraw funds
  const withdrawalFunds = async () => {
    try { 
      await Contract.withdraw().send({
        from: currentAccount,
      })

      handleWithdraw();
    } catch(error) {
      console.log(error)
    }
  }

  // set beneficiary
  const setBeneficiary = async () => {
    await Contract.setBeneficiary(beneficiary).send({
      from: currentAccount,
    })

     handleNewBeneficiary()
  }

  return (
    <Context.Provider
      value={{
        currentAccount,
        handleNewNotification,
        handleNewFundraiser,
        ConnectButton,
        factoryContract,
        funds,
        loading,
        getAfundraiser,
        imageURL,
        fundName,
        description,
        getFundraiserDetails,
        modalLoading,
        ethAmount,
        submitFunds,
        setDonationAmount,
        totalDonations,
        Contract,
        donationAmount,
        renderDonationsList,
        url,
        Owner,
        withdrawalFunds,
        setBeneficiary,
        setNewBeneficiary,
        beneficiary,
        nftimage,
        handleImage,
        game,
        handleGame,
        setCurrentAccount
      }}
    >
      {children}
    </Context.Provider>
  );
}