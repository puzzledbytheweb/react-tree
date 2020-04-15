import React from "react";
import PropTypes from "prop-types";

import { LevelInterface } from "../../types";

import useTree from "../../hooks/useTree";

import Branch from "../Branch/Branch";

import AddCell from "../AddCell/AddCell";

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

  if (!tree || tree.length === 0)
    return <AddCell onAddCell={handleAddNewTree} />;

  // Create a branch for each root
  return (
    <div>
      <AddCell onAddCell={handleAddNewRoot} buttonText="Add a new Root" />
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
    </div>
  );
};

Tree.propTypes = {
  initialTree: PropTypes.arrayOf(LevelInterface),
};

export default Tree;
