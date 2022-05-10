import React from 'react';
import { IoMdCreate } from "react-icons/io";
import { Button } from 'web3uikit';
//import Image from "next/image";
import Bg from '../assets/bg.png';
import Link from 'next/link';

const Banner = () => {
  return (
    <div className="flex w-full justify-center px-4 items-center">
      <div className="flex md:flex-row flex-col justify-between md:p-20 py-12 md:px-0 px-4">
        <div className="flex flex-1 justify-start items-start flex-col">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            We can help to <br /> save the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the Fundraisers world. Your donation is others inspiration.
          </p>
          <br />
          <div className="flex">
          <Link href="/create">
            <button
              type="button"
              className="flex flex-row justify-center items-center mr-2 bg-[#3198FE] p-3 rounded-lg cursor-pointer hover:bg-[#2546bd]"
            >
              <IoMdCreate className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Create NFT
              </p>
            </button>
            </Link>
            <Link href="/new">
              <Button
                icon="plus"
                className="btn-banner"
                id="test-button-primary-icon"
                onClick={function noRefCheck(){}}
                text="New Fundraiser"
                theme="primary"
                type="button"
              /> 
            </Link>
          </div>
        </div>
        <div className="md:mt-[-80px] mr-[-80px] hidden md:block mt-0">
          <Image src={Bg} alt="bg" />
        </div>
      </div>
    </div>
  )
}

export default Banner;