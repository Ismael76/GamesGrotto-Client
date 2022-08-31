import React from "react";

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex flex-row justify-content-center w-100 pt-4">
      <ul className="pagination  pe-4">
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item shadow">
              <a
                onClick={() => paginate(number)}
                className="page-link bg-transparent border-light rounded"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
