import React from "react";
import { CellInterface } from "../../types";

import List from "../List/List";
import ListCell from "../ListCell/ListCell";

const Branch = ({ objectBranch }) => {
  const { name, children } = objectBranch;

  return (
    <List>
      <ListCell name={name} />
      {/* We are checking whether the objectBranch has children */}
      {children &&
        children.map((individualChild) => (
          <Branch key={individualChild.id} objectBranch={individualChild} />
        ))}
    </List>
  );
};

Branch.propTypes = {
  objectBranch: CellInterface,
};

export default Branch;
