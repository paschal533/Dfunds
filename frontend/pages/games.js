import React from 'react';
import Link from 'next/link';
import { GameTile, Swiper } from '../components';
import Head from 'next/head';
const games = () => {
  return (
    <div className="w-full min-h-screen text-light-gray ">
      <Head>
        <title>NFT Games</title>
      </Head>
      <div className="min-h-screen">
        <Swiper />
        <p className="p-5 text-2xl text-white font-bold">Games</p>
        <div className="w-full p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <GameTile
            image="https://media.istockphoto.com/photos/generic-sports-car-moving-at-high-speed-on-a-racetrack-picture-id1290326188?b=1&k=20&m=1290326188&s=170667a&w=0&h=LDM5PUJ-mEXr81gH4yRun7kgY5K2yPcAuPXwusEIbm8="
            name="Wrong Side"
          />
        </div>
      </div>
    </div>
  );
};

export default games;
