import React from "react";
import Proptypes from "prop-types";

import { LevelInterface } from "../../types";

import useTree from "./useTree";

import Branch from "../Branch/Branch";

const Tree = ({ initialTree }) => {
  const { tree, handleItemCheck } = useTree(initialTree);

  // Create a branch for each root
  return tree.map((branch) => {
    return (
      <Branch
        key={branch.id}
        objectBranch={branch}
        onItemCheck={handleItemCheck}
      />
    );
  });
};

Tree.propTypes = {
  initialTree: Proptypes.arrayOf(LevelInterface).isRequired,
};

export default Tree;
