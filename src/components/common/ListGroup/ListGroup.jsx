import React from 'react';

const ListGroup = ({ items, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group">
      {items.map(item => {
        let classes = item === selectedItem ? 'list-group-item active' : 'list-group-item';
        return (
          <li
            style={{ cursor: 'pointer' }}
            onClick={() => onItemSelect(item)}
            key={item._id}
            className={classes}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
