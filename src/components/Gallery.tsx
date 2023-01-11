import React, { useState, useEffect } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useScrollLock } from "../hooks/useScrollLock";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface IProps {
  images: string[];
}

const Gallery = ({ images }: IProps) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openImgIndex, setOpenImgIndex] = useState(activeImgIndex);
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    isOpen ? lockScroll() : unlockScroll();
    setOpenImgIndex(() => activeImgIndex);
  }, [isOpen, activeImgIndex, lockScroll, unlockScroll]);

  const handleOnClick = () => {
    setIsOpen(() => !isOpen);
  };

  const getNextImgIndex = () => {
    if (openImgIndex === images.length - 1) {
      return 0;
    }
    return openImgIndex + 1;
  };

  const getPrevImgIndex = () => {
    if (openImgIndex === 0) {
      return images.length - 1;
    }
    return openImgIndex - 1;
  };

  return (
    <>
      {isOpen && (
        <div
          className={`${
            isOpen
              ? "fixed top-0 left-0 z-[9999] w-[100%] h-[100vh] overflow-hidden bg-black bg-opacity-50 "
              : "hidden"
          }`}
          onClick={() => setIsOpen(() => false)}
        >
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex w-[100%] md:w-max h-[50%] md:h-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setOpenImgIndex(() => getPrevImgIndex());
              }}
              className="flex py-10 text-4xl text-white bg-transparent self-center border-none "
            >
              <FaArrowAltCircleLeft />
            </button>
            <LazyLoadImage
              src={images[openImgIndex]}
              alt="open"
              effect="blur"
              onClick={(e) => e.stopPropagation()}
              className="w-[50vw] h-[60vh] object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setOpenImgIndex(() => getNextImgIndex());
              }}
              className="flex py-10 text-4xl text-white bg-transparent self-center border-none "
            >
              <FaArrowAltCircleRight />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col-reverse md:flex-row items-center md:space-x-10 mx-10">
        <div className="flex flex-row md:flex-col space-x-5 md:space-y-5 md:space-x-0 overflow-x-auto md:overflow-y-auto">
          {images.map((image: string, index: number) => (
            <LazyLoadImage
              src={image}
              alt="option"
              effect="blur"
              onClick={() => setActiveImgIndex(() => index)}
              className={`${
                activeImgIndex === index
                  ? "border-b-2 border-black pb-1.5"
                  : "border-b-2 border-transparent hover:border-gray-500 pb-1.5"
              } w-[20vw] md:w-[10vw] lg:h-[6vw] h-[20vw] md:h-[10vw] lg:h-[6vw] select-none object-contain`}
              key={index}
            />
          ))}
        </div>
        <LazyLoadImage
          src={images[activeImgIndex]}
          alt="active"
          effect="blur"
          onClick={() => handleOnClick()}
          className="w-[80vw] md:w-[30vw] h-[80vw] md:h-[30vw] mb-5 md:mb-0 select-none pointer-events-none md:pointer-events-auto object-contain"
        />
      </div>
    </>
  );
};

export default Gallery;
