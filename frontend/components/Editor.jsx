import React, { useState, useEffect, useContext } from 'react';
import { SketchPicker } from 'react-color';
import Link from 'next/link';
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { toPng } from 'html-to-image';
import { FiEdit2 } from 'react-icons/fi';
import { Context } from '../context/contextProvider';

export default function Editor() {
  const height = 32;
  const width = 32;
  const [color, setColor] = useState('#808080');
  const [loading, setloading] = useState(false);

  const [mouseDown, setMouseDown] = useState(false);
  const [background, setBackground] = useState('#fff');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleImage } = useContext(Context);
  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const canvas = document.querySelector('#pixel_canvas');
    canvas.innerHTML = '';

    for (let x = 0; x < height; x++) {
      let row = document.createElement('tr');
      canvas.appendChild(row);

      for (let y = 0; y < width; y++) {
        let cell = document.createElement('td');
        cell.style.cssText = 'border:1px inset #80808020';
        cell.className = 'h-5 w-5';
        row.appendChild(cell);
      }
    }
  };
  const handleCellColorOnClick = (event) => {
    event.target.style.backgroundColor = color;
    setMouseDown(true);
  };

  const handleMouseState = () => {
    setMouseDown(false);
  };

  // Remove color
  const handleColorRemove = (event) => {
    event.target.style.backgroundColor = '';
  };

  const clearGrid = () => {
    initializeGrid();
  };

  const previewNFT = async () => {
    let node = document.getElementById('pixel_canvas');
    var td = node.getElementsByTagName('td');
    for (let i = 0; i < td.length; i++) {
      td[i].style.border = 'none';
    }
    await toPng(node)
      .then(function (dataURL) {
        handleImage(dataURL);
        let img = new Image();
        let preImg = document.getElementById('preimg');
        preImg.src = dataURL;
        img.src = dataURL;
        img.style.visibility = 'visible';
      })
      .catch(function (error) {});
    for (let i = 0; i < td.length; i++) {
      td[i].style.border = '1px inset #80808020';
    }
    setloading(false);
  };
  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-center w-full gap-8 px-8 my-6 rounded-lg p-5">
        <table
          id="pixel_canvas"
          style={{ backgroundColor: background }}
          onMouseDown={handleCellColorOnClick}
          onMouseMove={mouseDown ? handleCellColorOnClick : null}
          onMouseUp={handleMouseState}
          onMouseLeave={handleMouseState}
          onTouchStart={handleCellColorOnClick}
          onTouchMove={mouseDown ? handleCellColorOnClick : null}
          onTouchEnd={handleMouseState}
          onDoubleClick={handleColorRemove}
        ></table>
        <div className="max-w-2xl md:ml-3 ml-0 mt-2 md:mt-0">
          <SketchPicker
            width={350}
            className={`h-full hidden sm:block `}
            disableAlpha={true}
            color={color}
            onChange={(color) => {
              setColor(color.hex);
            }}
          />
          <SketchPicker
            width={300}
            className={`block sm:hidden`}
            disableAlpha={true}
            color={color}
            onChange={(color) => {
              setColor(color.hex);
            }}
          />
          <div className="flex flex-col md:flex-1 space-y-6 mt-20">
            <Button
              as="a"
              backgroundColor="#3198FE"
              border="1px solid #3198FE"
              color="white"
              _hover={{
                backgroundColor: '#000',
                border: '1px solid #3198FE',
                color: 'white',
              }}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{ base: 'full', sm: 'auto' }}
              mb={{ base: 2, sm: 0 }}
              size="lg"
              cursor="pointer"
              onClick={() => {
                clearGrid();
              }}
            >
              Clear Grid
            </Button>

            <Button
              as="a"
              backgroundColor="#3198FE"
              border="1px solid #3198FE"
              color="white"
              _hover={{
                backgroundColor: '#000',
                border: '1px solid #3198FE',
                color: 'white',
              }}
              isLoading={loading}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{ base: 'full', sm: 'auto' }}
              mb={{ base: 2, sm: 0 }}
              size="lg"
              cursor="pointer"
              onClick={() => {
                onOpen();
                setloading(true);
                previewNFT();
              }}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: 'black' }}>
          <ModalHeader>
            <p className="text-white">Preview NFT</p>
          </ModalHeader>
          <ModalCloseButton
            backgroundColor="#3198FE"
            border="1px solid #3198FE"
            _hover={{
              backgroundColor: '#000',
              border: '1px solid #3198FE',
              color: 'white',
            }}
          />
          <ModalBody>
            <div id="preview">
              {loading ? <Spinner className="m-2 text-light-purple" /> : <></>}
              <img alt="" id="preimg"></img>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="#3198FE"
              border="1px solid #3198FE"
              _hover={{
                backgroundColor: '#000',
                border: '1px solid #3198FE',
                color: 'white',
              }}
              leftIcon={<FiEdit2 />}
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Edit
            </Button>
            <Link passHref href="/mint">
              <Button
                variant="outline"
                backgroundColor="#3198FE"
                border="1px solid #3198FE"
                _hover={{
                  backgroundColor: '#000',
                  border: '1px solid #3198FE',
                  color: 'white',
                }}
              >
                Mint ✨
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
