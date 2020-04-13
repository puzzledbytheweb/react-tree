import React from "react";
import Proptypes from "prop-types";

import { LevelInterface } from "../../types";

import useTree from "./useTree";

import Branch from "../Branch/Branch";

const Tree = ({ initialTree }) => {
  const { tree, handleItemCheck, handleCellAdd, handleCellRemove } = useTree(
    initialTree
  );

  // Create a branch for each root
  return (
    <div>
      {tree.map((branch) => {
        return (
          <Branch
            key={branch.id}
            objectBranch={branch}
            onItemCheck={handleItemCheck}
            onAddCell={handleCellAdd}
            onRemoveCell={handleCellRemove}
          />
        );
      })}
    </div>
  );
};

Tree.propTypes = {
  initialTree: Proptypes.arrayOf(LevelInterface).isRequired,
};

export default Tree;
