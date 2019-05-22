import React from 'react';

const Pagination = ({ itemsNumber, itemsPerPage }) => {
  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {/* Previous Arrow */}
          <li class="page-item">
            <button class="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </button>
          </li>
          {makeArray(Math.ceil(itemsNumber / itemsPerPage)).map(page => {
            return (
              <li class="page-item">
                <button class="page-link">{page}</button>
              </li>
            );
          })}

          {/* Next Arrow */}
          <li class="page-item">
            <button class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

function makeArray(length) {
  var array = [];

  for (let i = 1; i <= length; i++) {
    array.push(i);
  }

  return array;
}

export default Pagination;
