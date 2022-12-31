import React from "react";

interface IProps {
  totalPosts: number;
  productsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const Pagination = ({
  totalPosts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}: IProps) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / productsPerPage); i++) {
    pages.push(i);
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex space-x-5 justify-center items-center my-10">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            className={`w-8 h-8 ${
              page === currentPage && "border text-blue-600"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
