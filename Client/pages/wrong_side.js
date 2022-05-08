import React, { useContext } from 'react';
import { Context } from '../context/contextProvider';
import $ from 'jquery';
import bike from '../img/hero-car.png';
import car from '../img/car.png';
import { Button, useToast } from '@chakra-ui/react';
import Head from 'next/head';

const Wrong_side = () => {
  const { game } = useContext(Context);
  const toast = useToast();
  var carPosition = [0, 1, 0];
  var currentLane = 1;
  var rockPosition = 0;
  var score = 0;
  var valid = 1;
  var gameRunningInterval;
  var gameScoreInterval;
  // round start
  function start() {
    score = 0;
    const node = document.getElementsByClassName('bike');
    if (game !== '') {
      node[0].src = game;
    } else {
      node[0].src = bike.src;
    }

    $('.dl').addClass('road-animation');
    $('.dr').addClass('road-animation');
    gameRunningInterval = setInterval(() => {
      $('.rock').removeClass('start-game');
      rockPosition = Math.floor(Math.random() * 3);
      $('.rock').css('left', 29 + rockPosition * 14 + '%');
      $('.rock').addClass('start-game');
    }, 1500);
    gameScoreInterval = setInterval(() => {
      score++;
      $('.score-text').text(score);
      checkGameOver();
    }, 100);
  }

  // end game
  function endGame() {
    clearInterval(gameRunningInterval);
    clearInterval(gameScoreInterval);
    $('.game-screen').addClass('hide');
    $('.game-over-screen').removeClass('hide');
    $('.final-score').text(score);
    if (score >= 500) {
      toast({
        title: 'Congratulations 🎉',
        description: 'You have won yourself our premium NFT, claim by clicking on button',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
      $('.claim').removeClass('hide');
    }
  }

  //function to go left
  function goLeft() {
    if (currentLane > 0) {
      carPosition[currentLane] = 0;
      currentLane--;
      carPosition[currentLane] = 1;
    }
    $('.bike').css('left', 29 + currentLane * 14 + '%');
    // console.log(carPosition);
  }

  //function to go right
  function goRight() {
    if (currentLane < 2) {
      carPosition[currentLane] = 0;
      currentLane++;
      carPosition[currentLane] = 1;
    }
    $('.bike').css('left', 29 + currentLane * 14 + '%');
    // console.log(carPosition);
    // console.log(carPosition);
  }

  //check if game over
  function checkGameOver() {
    if (rockPosition == currentLane) {
      var rockTop = parseInt($('.rock').css('top'));
      var bikeTop = parseInt($('.bike').css('top'));
      if (rockTop - bikeTop > -70 && rockTop - bikeTop < 20) {
        $('.dl').removeClass('road-animation');
        $('.dr').removeClass('road-animation');
        endGame();
      }
    }
  }

  //on click listeners
  function onRightBtnClick() {
    goRight();
  }
  function onLeftBtnClick() {
    goLeft();
  }
  function onStartBtnClicked() {
    if (valid) {
      $('.start-screen').addClass('hide');
      $('.game-screen').removeClass('hide');
      start();
    }
  }
  function onRetryBtnClick() {
    start();
    $('.game-screen').removeClass('hide');
    $('.game-over-screen').addClass('hide');
    $('.claim').addClass('hide');
  }

  return (
    <div className="w-full color-white">
      <Head>
        <title>Wrong-Side Game</title>
      </Head>
      <div className='w-full flex text-white items-center justify-center pt-10'><p>Get a score higher than <span className='text-red'> 500 </span> to claim your reward NFT</p></div>
      <div className="w-full flex md:flex-row h-screen flex-col items-center justify-center">
        <div className="content flex flex-col">
          <div className="app-wrapper game-screen hide">
            <div className="road"></div>
            <img className="bike"></img>
            <img className="rock" src={car.src}></img>
            <div className="right" id="btn" onClick={onRightBtnClick}></div>
            <div className="left" id="btn" onClick={onLeftBtnClick}></div>
            <div className="scoreboard">
              <p className="score-title">Score</p>
              <p className="score-text">10</p>
            </div>
            <div className="dl" id="divider">
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
            </div>
            <div className="dr" id="divider">
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
            </div>
          </div>
          <div className="app-wrapper start-screen ">
            <div className="start-menu">
              <div className="start-title"></div>
              <div className="start-btn" onClick={onStartBtnClicked}></div>
            </div>
          </div>
          <div className="app-wrapper game-over-screen hide">
            <div className="start-menu">
              <div className="start-title"></div>
              <div className="a-1">
                <p className="final-score">100</p>
                <div className="retry-btn" onClick={onRetryBtnClick}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="claim hide">
            {/* <a
              src="https://cloudflare-ipfs.com/ipfs/bafybeihz5jer6ad75ku3dh6mj4rlufrtiydv5mkoqurm55nv2uckmfiuya?contract=0xF04F9Ec03a8d0A7DA309951F5E616F8540C58D94&chainId=4&tokenId=0"
              target="_blank"
              rel="noreferrer"
            > */}
            <Button
              className="hidden ml-0 mt-10 md:ml-10 md:mt-0"
              as="a"
              href="https://cloudflare-ipfs.com/ipfs/bafybeihz5jer6ad75ku3dh6mj4rlufrtiydv5mkoqurm55nv2uckmfiuya?contract=0xF04F9Ec03a8d0A7DA309951F5E616F8540C58D94&chainId=4&tokenId=1"
              target="_blank"
              backgroundColor="#915bff"
              border="1px solid #915bff"
              _hover={{
                backgroundColor: '#000',
                border: '1px solid #915bff',
                color: 'white',
              }}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{ base: 'full', sm: 'auto' }}
              mb={{ base: 2, sm: 0 }}
              size="lg"
              cursor="pointer"
            >
              Claim your premium NFT
            </Button>
            {/* </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrong_side;
