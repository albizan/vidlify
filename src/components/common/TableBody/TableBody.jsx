import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

const TableBody = ({ items, columns }) => {
  return (
    <tbody>
      {items.map(item => (
        <tr key={item._id}>
          {columns.map(column => (
            <td key={column.target || column.key}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

function renderCell(item, column) {
  // If column has a content function calli it to return a Like/Button
  if (column.content) return column.content(item);
  return _.get(item, column.target);
}

TableBody.propTypes = {
  items: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableBody;
