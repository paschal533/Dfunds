import React, { useContext } from 'react';
import { Context } from '../context/contextProvider';
import FundraiserCard from './FundraiserCard';
import { Icon, Loading } from 'web3uikit';
import Loader from './Loader';

const CardContainer = () => {
  const { funds, loading } = useContext(Context);

  return (
    <div className="flex min-h-[30vh] flex-col items-center lg:mt-[-100px] justify-center md:mt-[-60px] py-2">
      <div className="drop-shadow-lg h-[100%] w-[90%] md:p-4 p-2 rounded-lg bg-slate-300">
        <div className="flex justify-between w-full">
          <h1 className="mb-2 text-2xl">Top Fundraisers</h1>
          <Icon
            fill="#daa520"
            size={24}
            svg="star"
          />
        </div>
        <div className="w-[100%] flex mb-4 h-[1px] bg-[#111]" />
        <div className="md:p-1 p-0 md:ml-0 md:flex items-center justify-center">
          {!loading ? funds.slice(0, 4).map((fundraiser) => {
            return (
              <FundraiserCard
                fundraiser={fundraiser}
                key={fundraiser}
              />
          )}) : <Loader />}
        </div>
      </div>
    </div>
  )
}

export default CardContainer;