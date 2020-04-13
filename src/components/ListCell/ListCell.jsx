import React from "react";
import PropTypes from "prop-types";

import { LevelItemInterface } from "../../types";

import AddCell from "../AddCell/AddCell";

const ListCell = ({ name, items, onItemCheck, onAddCell, parentId }) => {
  const handleHandleCell = (values) => onAddCell(parentId, values);

  return (
    <li>
      <h3>{name}</h3>
      <AddCell onAddCell={handleHandleCell} />
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
};

ListCell.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(LevelItemInterface),
  onItemCheck: PropTypes.func.isRequired,
  onAddCell: PropTypes.func.isRequired,
  parentId: PropTypes.string,
};

export default ListCell;
