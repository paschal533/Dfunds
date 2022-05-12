import React, { useEffect, useState } from "react";
import { 
  BiReceipt
 } from "react-icons/bi";
import Link from "next/link";
import FundraiserFactor from '../contracts/FundraiserFactory.json';
import FundraiserContract from '../contracts/Fundraiser.json';
import { useToast, Button } from '@chakra-ui/react';
const { Conflux, Drip } = require('js-conflux-sdk');

const cc = require('cryptocompare');

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const cfx = new Conflux({
    url: "https://test.confluxrpc.com",
    networkId: 1
  });

  const toast = useToast()

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
    const init = async () => {
      try{
        const acct = cfx.wallet.addPrivateKey('0x9d2c1dc41f209792f8af782f1afcaa2bfc54dd2d67a40722143cd5b36224ffab')
        //const contract = cfx.Contract({ abi: FundraiserFactor.abi, bytecode: FundraiserFactor.bytecode }
        //const txReceipt = await contract.constructor().sendTransaction({ from: acct }).executed()
        //console.log(txReceipt);
        const contrac = await cfx.Contract({ abi: FundraiserFactor.abi, address: "cfxtest:aca855fctap4ptfyn0aak58a9t9279pjfeb0ymf6vk" })
        setContract(contrac);
        const res = await contrac.fundraisers(4, 0).call({ from: acct });
        setFunds(res)
        setLoading(false)
      }catch(error){
        console.log(error)
      }
    }
    init();
  }, [currentAccount])

  const handleNewNotification = () => {
    toast({
      position: "top-left",
      title: 'Not Authenticated',
      description: 'Please Connect Your Crypto Wallet',
      status: 'error',
      duration: 9000,
      isClosable: true
    })
  };

  const handleNewFundraiser = () => {
    toast({
      position: "top-left",
      title: 'New Fundraiser',
      description: 'Fundraiser Created',
      status: 'success',
      duration: 9000,
      isClosable: true
    }) 
  };

  const handleDonation = () => {
    toast({
      position: "top-left",
      title: 'Donation',
      description: `You have successfully donated $ ${donationAmount} USD to the fundraiser`,
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  };

  const handleNewBeneficiary = () => {
    toast({
      position: "top-left",
      title: 'New Beneficiary',
      description: 'You have successfully changed the beneficary',
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  };

  const handleWithdraw = () => {
    toast({
      position: "top-left",
      title: 'Withdraw',
      description: 'You have successfully withdrawn your funds',
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  };

  const handleNotEnuogh = () => {
    toast({
      position: "top-left",
      title: 'Not enuogh fund',
      description: 'Sorry you do not have enuogh fund to make this transaction',
      status: 'error',
      duration: 9000,
      isClosable: true
    })
  };

  // get a fundraiser details
  const getAfundraiser = async (fund) => {
    setModalLoading(true)
    try {
      const acct = cfx.wallet.addPrivateKey('0xf507bf529f870fff107fee93220a7f0516d90914c3510d53ac08e8b723c64f0a')
      const instance = await cfx.Contract({ abi: FundraiserContract.abi, address: fund })
      setFactoryContract(instance)

      const name = await instance.name().call({ from: acct })
      const description = await instance.description().call({ from: acct })
      const totalDonations = await instance.totalDonations().call({ from: acct })
      const imageURL = await instance.imageURL().call({ from: acct })
      const url = await instance.url().call({ from: acct })

      setFundname(name)
      setDescription(description)
      setImageURL(imageURL)
      setURL(url)

      const userDonations = await instance.myDonations().call({ from: currentAccount })
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
      console.log(error);
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
    console.log(factoryContract)

    try {
      const donation =  Drip.fromCFX(cfxTotal).toString()

      const tx = await factoryContract.donate().sendTransaction({
        from: currentAccount,
        value: donation,
        gas: 650000
      }).executed()
      setDonationAmount('')
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
      const cfxAmount = Drip.fromGDrip(donations.values[i])
      const userDonation = exchangeRate * cfxAmount
      const donationDate = donations.dates[i]
      donationList.push({ donationAmount: userDonation.toFixed(2), date: donationDate})
    }

    return donationList.map((donation) => {
      return (
        <div className="mt-3 flex justify-between">
          <p className="mr-4 mt-4 donationAmount">${donation.donationAmount.slice(0, 4)}</p>
          <Link className="donation-receipt-link" href={{ pathname: '/receipts', query: { fund: fundName, donation: donation.donationAmount, date: donation.date} }}>
            <Button
              bg="#3198FE"
              color="white"
              fontWeight="semibold"
              rounded="lg"
              leftIcon={<BiReceipt />}
              _hover={{}}
              _focus={{}}
              _active={{}}
              >
                <p className="text-white text-base font-semibold">
                  Request Receipt
                </p>
              </Button>
          </Link>
        </div>
      )
    })
  }

  //withdraw funds
  const withdrawalFunds = async () => {
    try { 
      await factoryContract.withdraw().sendTransaction({
        from: currentAccount,
      }).executed()

      handleWithdraw();
    } catch(error) {
      console.log(error)
    }
  }

  // set beneficiary
  const setBeneficiary = async () => {
    await factoryContract.setBeneficiary(beneficiary).sendTransaction({
      from: currentAccount,
    }).executed()

     handleNewBeneficiary()
  }

  return (
    <Context.Provider
      value={{
        currentAccount,
        handleNewNotification,
        setLoading,
        handleNewFundraiser,
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