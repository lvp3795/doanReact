import React from "react";

function Pagination({ totalPage, changePage }) {
  const pageNumbers = [];
  for (let index = 1; index <= totalPage; index++) {
    pageNumbers.push(index);
  }
  return (
    <>
      <ul className="pagination">
        <span
          className="last"
          onClick={() => changePage(Number(pageNumbers[0]))}
        >
          First
        </span>
        {pageNumbers.map((number) => {
          return (
            <span key={number} onClick={() => changePage(number)}>
              {number}
            </span>
          );
        })}

        <span
          className="last"
          onClick={() => changePage(Number(pageNumbers.length))}
        >
          Last »
        </span>
      </ul>
    </>
  );
}

export default Pagination;
