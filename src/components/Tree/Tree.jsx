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
    setTree,
  } = useTree(initialTree);

  const onEditCellName = (path, values) => {
    handleEditCellName(path, values.name);
  };

  const handleAddNewTree = (values) => {
    setTree([values]);
  };

  const handleAddNewRoot = (values) => {
    handleCellAdd(null, values);
  };

  const handleDragEnd = (result) => {
    console.log(result);
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
        {tree.map((branch) => {
          return (
            <Branch
              key={branch.id}
              objectBranch={branch}
              onItemCheck={handleItemCheck}
              onAddCell={handleCellAdd}
              onRemoveCell={handleCellRemove}
              onEditCellName={onEditCellName}
              onAddCellItem={handleAddCellItem}
            />
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
