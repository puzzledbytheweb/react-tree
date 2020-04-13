import React from "react";
import { LevelItemInterface } from "../../types";

import PropTypes from "prop-types";

const ListCell = ({ name, items, onItemCheck, parentId }) => (
  <li>
    <h3>{name}</h3>
    {items &&
      items.map((item) => (
        <div style={{ display: "flex" }} key={item.id}>
          <p>{item.name}</p>
          <input
            onChange={() => onItemCheck(item, parentId)}
            checked={item.checked}
            type="checkbox"
          />
        </div>
      ))}
  </li>
);

ListCell.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(LevelItemInterface),
  onItemCheck: PropTypes.func.isRequired,
  parentId: PropTypes.string,
};

export default ListCell;
