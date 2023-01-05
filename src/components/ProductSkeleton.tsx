import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="w-full bg-white p-4 border border-gray-300 border-b-gray-500">
      <div className="flex flex-col ">
        <div className="capitalize ">
          <div className="w-full h-6 mb-4 skeleton-bg "></div>
          <div className="w-1/2 h-4 mb-4 ml-3 skeleton-bg "></div>
        </div>
        <div className="flex self-center w-[25vh] h-[25vh] md:w-[15vw] md:h-[15vw]">
          <div className="w-full h-full skeleton-bg "></div>
        </div>
        <div className="flex justify-around mt-4">
          <div className="flex flex-col items-center">
            <div className="w-[65px] h-4 skeleton-bg mb-3"></div>
            <div className="w-[100px] h-4 skeleton-bg"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[65px] h-3 skeleton-bg mb-3"></div>
            <div className="w-[100px] h-4 skeleton-bg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
