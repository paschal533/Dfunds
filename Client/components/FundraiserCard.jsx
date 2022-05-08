import React, {useEffect, useContext, useState} from 'react';
import Link from 'next/link';
import { Context } from '../context/contextProvider';
import FundraiserContract from '../contracts/Fundraiser.json';
import { Card, Button } from 'web3uikit';
import Web3 from 'web3'

const cc = require('cryptocompare');

const FundraiserCard = ({ fundraiser }) => {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  const ethAmount = (donationAmount / exchangeRate || 0).toFixed(4)

  const { modalOpen } = useContext(Context);
  const [ contract, setContract] = useState(null)
  const [ accounts, setAccounts ] = useState(null)
  const [ fund, setFundraiser ] = useState(null)
  const [ fundName, setFundname ] = useState(null)
  const [ description, setDescription ] = useState(null)
  const [ totalDonations, setTotalDonations ] = useState(null)
  const [ imageURL, setImageURL ] = useState(null)
  const [ url, setURL ] = useState(null)
  const [ open, setOpen] = React.useState(false);
  const [ donationAmount, setDonationAmount] = useState(null)
  const [ exchangeRate, setExchangeRate ] = useState(null)
  const [ userDonations, setUserDonations ] = useState(null)
  const [ isOwner, setIsOwner ] = useState(false)
  const [ beneficiary, setNewBeneficiary ] = useState('');

  useEffect(() => {
    if (fundraiser) {
      getAfund(fundraiser)
    }
  }, [fundraiser]);

   // get a fundraiser details
   const getAfund = async (fund) => {
    try {
      const instance = new web3.eth.Contract(
        FundraiserContract.abi,
        fund
      );

      const name = await instance.methods.name().call()
      const description = await instance.methods.description().call()
      const totalDonations = await instance.methods.totalDonations().call()
      const imageURL = await instance.methods.imageURL().call()
      const url = await instance.methods.url().call()
      //setTotalDonations(web3.utils.fromWei(totalDonations, 'ether'))

      //const exchangeRate =  10
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

      const isUser = currentAccount
      const isOwner = await instance.methods.owner().call()

      if (isOwner === currentAccount) {
        setIsOwner(true)
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  const cardDetails = () => {
    return (
      <div>
        <div className="text-[#030A1C] text-sm">{`${description?.slice(0, 150)}...`}</div>
        <div className="font-bold">Total Donations: ${totalDonations}</div>
        <Link className="donation-receipt-link" href={`/fundraiser/${fundraiser}`}>
          <Button
            id="test-button-primary"
            text="View more"
            theme="primary"
            type="button"
          />
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="md:w-[250px] md:mt-0 md:mb-0 md:ml-3 mt-3 mb-3 ml-0 mr-0  w-[100%]">
        <Card
          description={cardDetails()}
          setIsSelected={function noRefCheck(){}}
          title={fundName}
          tooltipText={<span style={{width: 200}}>{description}</span>}
         >
          <div>
            <img
              src={imageURL}
              height="180px"
              alt="fundraiser"
              width="100%"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default FundraiserCard;