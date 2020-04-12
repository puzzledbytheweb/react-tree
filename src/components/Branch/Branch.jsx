import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { LevelInterface } from "../../types";

import List from "../List/List";
import ListCell from "../ListCell/ListCell";

const Branch = ({ objectBranch, onItemCheck }) => {
  const { name, items, children, id, parentId } = objectBranch;

  const handleItemCheck = (item, path) => {
    let newPath = path || "";

    // Checking if we are deeper than one level, i.e. this is not the root node
    // We are creating a path of ids here, so that when we need to
    // traverse the branch we know where to go
    if (parentId) {
      newPath += parentId + "|";
    }

    // Calling this function with 3rd param when we are in the root
    onItemCheck(item, newPath, !newPath && id);
  };

  return (
    <List>
      <ListCell name={name} items={items} onItemCheck={handleItemCheck} />
      {/* We are checking whether the objectBranch has children */}
      {children &&
        children.map((individualChild) => {
          individualChild.parentId = id;

          console.log(individualChild.name, individualChild.parentId);

          return (
            <Branch
              key={individualChild.id}
              objectBranch={individualChild}
              onItemCheck={handleItemCheck}
            />
          );
        })}
    </List>
  );
};

Branch.propTypes = {
  objectBranch: LevelInterface,
  onItemCheck: PropTypes.func,
};

export default Branch;
