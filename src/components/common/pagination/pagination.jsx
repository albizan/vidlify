import React from 'react';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  // Calculate the number of pages to display in pagination
  const pagesCount = Math.ceil(itemsCount / pageSize);

  // If all items can be displayed in just one page, do not show pagination
  if (pagesCount === 1) return null;

  // Use Lodash to generate an array called pages with the given range
  const pages = _.range(1, pagesCount + 1);

  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* Map through pages array to display each pagination item */}
          {pages.map(page => {
            // Append active class to pagination item when needed
            let classes = 'page-item';
            if (page === currentPage) {
              classes += ' active';
            }
            return (
              <li key={page} className={classes}>
                <button
                  onClick={() => onPageChange(page)}
                  className="page-link"
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Pagination;
