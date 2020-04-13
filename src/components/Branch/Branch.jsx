import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { LevelInterface } from "../../types";

import List from "../List/List";
import ListCell from "../ListCell/ListCell";

const Branch = ({ objectBranch, onItemCheck, parentId }) => {
  const { name, items, children, id } = objectBranch;

  const handleItemCheck = (item, path) => {
    let newPath = path || "";

    // Checking if we are deeper than one level, i.e. this is not the root node
    // We are creating a path of ids here, so that when we need to
    // traverse the branch we know where to go
    if (parentId) {
      newPath += "|" + parentId;
    }

    onItemCheck(item, newPath);
  };

  return (
    <List>
      <ListCell
        name={name}
        items={items}
        parentId={id}
        onItemCheck={handleItemCheck}
      />
      {children &&
        children.map((individualChild) => (
          <Branch
            key={individualChild.id}
            objectBranch={individualChild}
            onItemCheck={handleItemCheck}
            parentId={id}
          />
        ))}
    </List>
  );
};

Branch.propTypes = {
  objectBranch: LevelInterface,
  onItemCheck: PropTypes.func,
};

export default Branch;
