import React from "react";
import Proptypes from "prop-types";

import { CellInterface } from "../../types";

import Branch from "../Branch/Branch";

const Tree = ({ objectTree }) => {
  // Create a branch for each root
  return objectTree.map((branch) => (
    <Branch key={branch.id} objectBranch={branch} />
  ));
};

Tree.propTypes = {
  objectTree: Proptypes.arrayOf(CellInterface).isRequired,
};

export default Tree;
