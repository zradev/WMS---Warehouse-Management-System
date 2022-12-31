import React from "react";

const NoResults = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-4 bg-white py-7">
        <img
          src={
            "https://static.vecteezy.com/system/resources/previews/004/968/529/original/search-no-results-found-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-with-editable-stroke-line-outline-linear-vector.jpg"
          }
          alt="no-results-found"
          className="max-w-[40vh] max-h-[40vh]"
        />
        <div className="flex flex-col justify-center text-center text-2xl">
          <h2>No Results Found!</h2>
          <p>We couldn't find what you're looking for.</p>
        </div>
      </div>
    </>
  );
};

export default NoResults;
