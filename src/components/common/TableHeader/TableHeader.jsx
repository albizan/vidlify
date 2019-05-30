import React from 'react';

// Columns: array
// sortColumn: object
// onSort: function

const TableHeader = props => {
  const { columns, sortColumn, onSort } = props;
  return (
    <thead>
      <tr>
        {columns.map(column => {
          return (
            <th
              key={column.label || column.key}
              onClick={() => raiseSort(column.target, sortColumn, onSort)}
            >
              {column.label}
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
