import React from 'react';
import Link from 'next/link';
const GameTile = (props) => {
  return (
    <Link href={`/mynft`} passHref>
      <div className="w-full bg-gray item-tile-hover-animation rounded-md cursor-pointer">
        <div className={`w-full h-44 overflow-hidden`}>
          <img className="h-44 w-full object-cover rounded-t-md" src={props.image} />
        </div>
        <div className="flex justify-center h-24 items-center bg-[#111]">
          <div className="p-2 text-center ">
            <p className="text-lg font-bold text-white">{props.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameTile;
