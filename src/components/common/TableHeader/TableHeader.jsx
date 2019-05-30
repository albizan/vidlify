import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableHeader = ({ columns, sortColumn, onSort }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => {
          return (
            <th
              className="clickable"
              key={column.label || column.key}
              onClick={() => raiseSort(column.target, sortColumn, onSort)}
            >
              {column.label} {renderSortIcon(column, sortColumn)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;

function raiseSort(target, sortColumn, onSort) {
  if (sortColumn.target === target) {
    sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    onSort(sortColumn);
  } else {
    sortColumn.target = target;
    sortColumn.order = 'asc';
    onSort(sortColumn);
  }
}

function renderSortIcon(column, sortColumn) {
  if (column.target !== sortColumn.target) return null;
  if (sortColumn.order === 'asc') return <FontAwesomeIcon icon={'sort-up'} />;
  else return <FontAwesomeIcon icon={'sort-down'} />;
}
