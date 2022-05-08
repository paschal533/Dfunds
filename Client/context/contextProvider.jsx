import React, { useEffect, useState } from "react";
//import getWeb3 from "./getWeb3";
import Link from "next/link";
const FundraiserFactory = require('../contracts/FundraiserFactory.json')
import FundraiserContract from '../contracts/Fundraiser.json';
import { useMoralis } from "react-moralis";
import {
  ConnectButton,
  useNotification,
} from "web3uikit";
const { Conflux } = require('js-conflux-sdk');
import Web3 from "web3";
// In browser: const Conflux = window.TreeGraph.Conflux;

const cc = require('cryptocompare');

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const conflux = new Conflux({
    url: "https://test.confluxrpc.com",
    networkId: 1
  });

  const { isAuthenticated, account } = useMoralis();
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

  // get factorycontract instance
  useEffect(() => {
    const init = async() => { 
      try {
        const contract = conflux.Contract({
          abi: FundraiserFactory.abi,
          address: FundraiserFactory.networks[1].address
        });
        setContract(contract);
      } catch(error) {
        alert(error)
        console.error(error);
      }
    }
  init();
  }, [currentAccount]);
  

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

  //get 20 Fundraisers
  useEffect(() => {
    getFundraisers()
  }, [factoryContract]);

  const getFundraisers = async () => {
    try {
      const contract = conflux.Contract({
        abi: FundraiserFactory.abi,
        address: FundraiserFactory.networks[1].address
      });
      const funds = await contract?.fundraisers(10, 0).call()
      console.log(funds)
      setFunds(funds)
      setLoading(false);
    }
    catch(error) {
      console.error(error);
    }
  }

  // get a fundraiser details
  /*const getAfundraiser = async (fund) => {
    try {
      const instance = new web3.eth.Contract(
        FundraiserContract.abi,
        fund
      );
      setContract(instance);

      const name = await instance.methods.name().call()
      const description = await instance.methods.description().call()
      const totalDonations = await instance.methods.totalDonations().call()
      const imageURL = await instance.methods.imageURL().call()
      const url = await instance.methods.url().call()
      
      const exchangeRate = await cc.price('ETH', ['USD'])
      setExchangeRate(exchangeRate.USD)
      const eth = web3.utils.fromWei(totalDonations, 'ether')
      const dollarDonationAmount = exchangeRate.USD * eth

      setTotalDonations(dollarDonationAmount.toFixed(2))
      setFundname(name)
      setDescription(description)
      setImageURL(imageURL)
      setURL(url)

      const userDonations = await instance.methods.myDonations().call({ from: currentAccount })
      console.log(userDonations)
      setUserDonations(userDonations)

     // const isUser = currentAccount
      const isOwner = await instance.methods.owner().call()
      setModalLoading(false);

      if (isOwner.toLowerCase() === currentAccount) {
        setIsOwner(true)
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  const getFundraiserDetails = (fundraiser) => {
    getAfundraiser(fundraiser);
  }
 
  const ethAmount = (donationAmount / exchangeRate || 0).toFixed(4)

// submit donation
  const submitFunds = async () => {
    const ethRate = exchangeRate
    const ethTotal = donationAmount / ethRate

    try { 
      const donation = web3.utils.toWei(ethTotal.toString(), 'ether')

      const tx = await Contract.methods.donate().send({
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
      await Contract.methods.withdraw().send({
        from: currentAccount,
      })

      handleWithdraw();
    } catch(error) {
      console.log(error)
    }
  }

  // set beneficiary
  const setBeneficiary = async () => {
    await Contract.methods.setBeneficiary(beneficiary).send({
      from: currentAccount,
    })

     handleNewBeneficiary()
  }*/

  return (
    <Context.Provider
      value={{
        currentAccount,
        handleNewNotification,
        handleNewFundraiser,
        ConnectButton,
        isAuthenticated,
        factoryContract,
        funds,
        loading,
        //getAfundraiser,
        //imageURL,
        //fundName,
        //description,
        //getFundraiserDetails,
        modalLoading,
        //ethAmount,
        //submitFunds,
        setDonationAmount,
        //totalDonations,
        Contract,
        //donationAmount,
        //renderDonationsList,
        //url,
        //Owner,
        //withdrawalFunds,
        //setBeneficiary,
        //setNewBeneficiary,
        //beneficiary,
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