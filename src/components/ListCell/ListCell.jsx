import React from "react";

import PropTypes from "prop-types";

const ListCell = ({ name, items, onItemCheck }) => (
  <li>
    <h3>{name}</h3>
    {items &&
      items.map((item) => (
        <div style={{ display: "flex" }} key={item.id}>
          <p>item.name</p>
          <input
            onChange={() => onItemCheck(item)}
            checked={item.checked}
            type="checkbox"
          />
        </div>
      ))}
  </li>
);

ListCell.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ListCell;
