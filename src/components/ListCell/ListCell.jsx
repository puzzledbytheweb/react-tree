import React from "react";
import PropTypes from "prop-types";

import { LevelItemInterface } from "../../types";

import AddCell from "../AddCell/AddCell";

const ListCell = ({
  name,
  items,
  onItemCheck,
  onAddCell,
  onRemoveCell,
  parentId,
}) => {
  const handleAddCell = (values) => onAddCell(parentId, values);
  const handleRemoveCell = () => onRemoveCell(parentId);

  return (
    <li>
      <h3>{name}</h3>
      <button onClick={handleRemoveCell}>Remove this Cell!!</button>
      <AddCell onAddCell={handleAddCell} />
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
  onRemoveCell: PropTypes.func.isRequired,
  parentId: PropTypes.string,
};

export default ListCell;
