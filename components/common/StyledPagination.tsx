import React from "react";
import IconArrowLeft from "@/app/assets/icons/iconArrowLeft.svg";
import Image from "next/image";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange(page: number): void;
}
const StyledPagination = (props: Props) => {
  const { totalItems, itemsPerPage, currentPage, onPageChange } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Generate an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center laptop:justify-end gap-x-1 pr-5 h-10 laptop:mt-2 ">
      {/* <button
        className="px-3 py-1 mx-1 text-sm font-medium text-gray-500 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </button> */}
      <button
        className="h-8 w-8 flex items-center justify-center text-sm font-medium  rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image src={IconArrowLeft} className="h-5 w-5 self-center" alt="" />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`h-8 w-8 items-center justify-center text-[16px] font-semibold ${
            currentPage === number &&
            "border border-primary text-primary text-gray-500"
          } rounded-lg hover:bg-gray-200`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className=" flex h-8 w-8 items-center justify-center text-sm font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Image src={IconArrowLeft} className="h-5 w-5 rotate-180 " alt="" />
      </button>
      {/* <button
        className="px-3 py-1 mx-1 text-sm font-medium text-gray-500 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button> */}
    </div>
  );
};

export default StyledPagination;
