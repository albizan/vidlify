import React from 'react';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';

const Table = ({ items, columns, sortColumn, onSort }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody items={items} columns={columns} />
    </table>
  );
};

export default Table;
