import React from "react";
import Proptypes from "prop-types";

import List from "../List";
import ListCell from "../ListCell";

const Branch = ({ objectBranch }) => {
  // Render either a List or a ListCell regarding if the object has a child or not
  if (!objectBranch.child) {
    return Branch;
  }

  return objectBranch;
};

Branch.proptypes = {
  objectBranch: Proptypes.object,
};

export default Branch;
