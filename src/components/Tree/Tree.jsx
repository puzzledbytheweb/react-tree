import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { DragDropContext } from "react-beautiful-dnd";

import { LevelInterface } from "../../types";

import useTree from "../../hooks/useTree";
import { createNewEmptyNode } from "../../utils";

import Branch from "../Branch/Branch";
import ButtonWithForm from "../ButtonWithForm/ButtonWithForm";

const Tree = ({ initialTree = null }) => {
  const {
    tree,
    handleItemCheck,
    handleCellAdd,
    handleCellRemove,
    handleEditCellName,
    handleAddCellItem,
    handleDragItem,
    handleNewTree,
  } = useTree(initialTree);

  const onEditCellName = (path, values) => {
    handleEditCellName(path, values.name);
  };

  const handleAddNewTree = (values) => handleNewTree(values);

  const handleAddNewRoot = (values) => {
    handleCellAdd(null, values);
  };

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return;

    // Check if we are not dropping component in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    handleDragItem(source, destination);
  };

  if (!tree || tree.length === 0)
    return (
      <ButtonWithForm
        formInitialValues={createNewEmptyNode()}
        onSubmit={handleAddNewTree}
        button={
          <Button size="xs" outline color="success">
            Start a new Tree!
          </Button>
        }
      />
    );

  // Create a branch for each root
  return (
    <div>
      <ButtonWithForm
        formInitialValues={createNewEmptyNode()}
        onSubmit={handleAddNewRoot}
        button={
          <Button size="xs" outline color="success">
            Add a new Root!
          </Button>
        }
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        {tree.map((branch, index) => {
          return (
            // <Droppable key={branch.id} droppableId={branch.id}>
            //   {(provided) => (
            //     <div ref={provided.innerRef}>
            //       {provided.placeholder}
            <Branch
              // {...provided.droppableProps}
              key={branch.id}
              objectBranch={branch}
              onItemCheck={handleItemCheck}
              onAddCell={handleCellAdd}
              onRemoveCell={handleCellRemove}
              onEditCellName={onEditCellName}
              onAddCellItem={handleAddCellItem}
              index={index}
            />
            //     </div>
            //   )}
            // </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
};

Tree.propTypes = {
  initialTree: PropTypes.arrayOf(LevelInterface),
};

export default Tree;
