import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import playGame from "../assets/play-game.jpg"
import winNFT from "../assets/win-nft.jpg"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

export default function App() {
  return (
    <div className="mt-6">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={playGame} height={400} width={1000} className="rounded-lg" alt="play-game" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={winNFT} height={400} width={1000} className="rounded-lg" alt="play-game" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
