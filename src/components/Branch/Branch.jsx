import React, { useRef, useEffect } from "react";

import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { Droppable } from "react-beautiful-dnd";

import { LevelInterface } from "../../types";

import useOpen from "../../hooks/useOpen";

import { FlexDiv } from "../Styled/Styled";

import ListCell from "../ListCell/ListCell";

const Branch = ({
  objectBranch,
  onItemCheck,
  parentId,
  onAddCell,
  onRemoveCell,
  onEditCellName,
  onAddCellItem,
  index,
}) => {
  const { open, toggleOpen } = useOpen(true);
  const { name, items, children, id, nodePath } = objectBranch;

  const createNewPath = (path) => {
    let newPath = path || "";

    // Checking if we are deeper than one level, i.e. this is not the root node
    // We are creating a path of ids here, so that when we need to
    // traverse the branch we know where to go
    if (parentId) {
      newPath += "|" + parentId;
    }

    return newPath;
  };

  const handleItemCheck = (item, path) => {
    const newPath = createNewPath(path);

    onItemCheck(item, newPath);
  };

  const handleAddCell = (path, values) => {
    const newPath = createNewPath(path);

    onAddCell(newPath, values);
  };

  const handleRemoveCell = (path) => {
    const newPath = createNewPath(path);

    onRemoveCell(newPath);
  };

  const handleEditCellName = (path, values) => {
    const newPath = createNewPath(path);

    onEditCellName(newPath, values);
  };

  const handleAddCellItem = (path, values) => {
    const newPath = createNewPath(path);

    onAddCellItem(newPath, values);
  };

  return (
    <div style={{ padding: 10 }}>
      <div style={{ width: "100%", textAlign: "left" }}>
        <Button size="xs" onClick={toggleOpen}>
          {open ? <small>Collapse</small> : <small>Expand</small>}
        </Button>
      </div>
      <ul style={{ display: open ? "block" : "none" }}>
        {/* We 're using the createNewPath function so that we can easily find the dropped
        component in the Tree component */}
        <Droppable key={id} droppableId={nodePath || id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {provided.placeholder}
              <FlexDiv>
                <ListCell
                  index={index}
                  name={name}
                  items={items}
                  parentId={id}
                  onItemCheck={handleItemCheck}
                  onAddCell={handleAddCell}
                  onRemoveCell={handleRemoveCell}
                  onEditCellName={handleEditCellName}
                  onAddCellItem={handleAddCellItem}
                />
              </FlexDiv>
              {children &&
                children.map((individualChild, childIndex) => (
                  <Branch
                    key={individualChild.id}
                    index={childIndex}
                    objectBranch={individualChild}
                    parentId={id}
                    onItemCheck={handleItemCheck}
                    onAddCell={handleAddCell}
                    onRemoveCell={handleRemoveCell}
                    onEditCellName={handleEditCellName}
                    onAddCellItem={handleAddCellItem}
                  />
                ))}
            </div>
          )}
        </Droppable>
      </ul>
    </div>
  );
};

Branch.propTypes = {
  objectBranch: LevelInterface,
  onItemCheck: PropTypes.func.isRequired,
  onAddCell: PropTypes.func.isRequired,
  onRemoveCell: PropTypes.func.isRequired,
  onEditCellName: PropTypes.func.isRequired,
  parentId: PropTypes.string || null,
  index: PropTypes.number.isRequired,
};

export default Branch;
