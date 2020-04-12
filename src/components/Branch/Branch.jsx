import React from "react";
import { CellInterface } from "../../types";

const Branch = ({ objectBranch }) => {
  console.log(objectBranch);
  // Render either a List or a ListCell regarding if the object has a child or not
  if (!objectBranch.child) {
    return <div>yo</div>;
  }

  return <div></div>;
};

Branch.propTypes = {
  objectBranch: CellInterface,
};

export default Branch;
