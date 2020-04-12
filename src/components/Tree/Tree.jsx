import React from "react";
import Proptypes from "prop-types";
import uuid from "uniq";

import { CellInterface } from "../../types";

import Branch from "../Branch/Branch";

const Tree = ({ objectTree }) => {
  return objectTree.map((branch) => (
    <Branch key={branch.id} objectBranch={branch} />
  ));
};

// Recursive type where child will be an array of identical objects
// const ItemShape = {
//   name: Proptypes.string.isRequired,
//   id: Proptypes.string.isRequired,
//   child: Proptypes.arrayOf(Proptypes.shape(this)) || null,
// };

Tree.propTypes = {
  objectTree: Proptypes.arrayOf(CellInterface).isRequired,
};

export default Tree;
