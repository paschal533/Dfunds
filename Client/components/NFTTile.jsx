import React, { useContext} from 'react';
import { FaEthereum } from 'react-icons/fa';
import { Context } from '../context/contextProvider';
import { useRouter } from 'next/router';

const ItemTile = (props) => {
  const { handleGame } = useContext(Context);
  const router = useRouter();
  const handleRedirect = (img) => {
    handleGame(img);
    router.push(`/wrong_side`);
  };
  return (
    <div
      className="w-full bg-gray item-tile-hover-animation rounded-md cursor-pointer"
      onClick={() => handleRedirect(props.image)}
    >
      <div className={`w-full h-44 overflow-hidden`}>
        <img className="h-44 w-full object-cover rounded-t-md" src={props.image} alt="NFT" />
      </div>
      <div className="flex justify-center h-24 items-center">
        <div className="p-2 text-center ">
          <p className="text-lg font-bold text-white">{props.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemTile;
