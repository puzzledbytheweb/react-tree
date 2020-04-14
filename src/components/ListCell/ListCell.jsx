import React from "react";
import PropTypes from "prop-types";

import { LevelItemInterface } from "../../types";

import { FlexDiv, ButtonFit } from "../Styled/Styled";

import AddCell from "../AddCell/AddCell";
import EditCell from "../EditCell/EditCell";

import AddCellItem from "../AddCellItem/AddCellItem";

const ListCell = ({
  name,
  items,
  onItemCheck,
  onAddCell,
  onRemoveCell,
  onEditCellName,
  onAddCellItem,
  parentId,
}) => {
  const handleAddCell = (values) => onAddCell(parentId, values);
  const handleEditSubmission = (values) => onEditCellName(parentId, values);
  const handleAddCellItem = (values) => onAddCellItem(parentId, values);
  const handleRemoveCell = () => onRemoveCell(parentId);

  return (
    <li>
      <FlexDiv>
        <h3>{name}</h3>
        <EditCell onEditCellName={handleEditSubmission} />
        <ButtonFit data-testid="removeButton" onClick={handleRemoveCell}>
          Remove this Cell!!
        </ButtonFit>
        <AddCell onAddCell={handleAddCell} />
      </FlexDiv>
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
      <AddCellItem onAddCellItem={handleAddCellItem} />
    </li>
  );
};

ListCell.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(LevelItemInterface),
  onItemCheck: PropTypes.func.isRequired,
  onAddCell: PropTypes.func.isRequired,
  onRemoveCell: PropTypes.func.isRequired,
  onEditCellName: PropTypes.func.isRequired,
  onAddCellItem: PropTypes.func.isRequired,
  parentId: PropTypes.string,
};

export default ListCell;
