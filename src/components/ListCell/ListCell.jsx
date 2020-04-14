import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LevelItemInterface } from "../../types";

import { FlexDiv } from "../Styled/Styled";
import AddCell from "../AddCell/AddCell";
import EditCell from "../EditCell/EditCell";

import AddCellItem from "../AddCellItem/AddCellItem";

const TitleAndButtonsDiv = styled(FlexDiv)`
  margin-bottom: 10px;

  & button {
    margin-right: 8px;
  }
`;

const ListItem = styled.li`
  border: 1px solid white;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
`;

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
    <ListItem>
      <TitleAndButtonsDiv>
        <h4 style={{ marginRight: 8 }}>{name}</h4>
        <EditCell onEditCellName={handleEditSubmission} />
        <Button
          size="xs"
          color="danger"
          data-testid="removeButton"
          onClick={handleRemoveCell}
        >
          <FontAwesomeIcon size="xs" icon="trash-alt" />
        </Button>
        <AddCell onAddCell={handleAddCell} />
      </TitleAndButtonsDiv>
      <ListGroup>
        {items &&
          items.map((item) => (
            <ListGroupItem
              style={{ display: "flex", alignItems: "center", padding: "5px" }}
              key={item.id}
            >
              <small style={{ color: "black", marginRight: 8 }}>
                {item.name}
              </small>
              <input
                onChange={() => onItemCheck(item, parentId)}
                checked={item.checked}
                type="checkbox"
              />
            </ListGroupItem>
          ))}
        <AddCellItem onAddCellItem={handleAddCellItem} />
      </ListGroup>
    </ListItem>
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
