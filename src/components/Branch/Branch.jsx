import React from "react";
import PropTypes from "prop-types";

import { LevelInterface } from "../../types";

import List from "../List/List";
import ListCell from "../ListCell/ListCell";

const Branch = ({ objectBranch, onItemCheck, parentId, onAddCell }) => {
  const { name, items, children, id } = objectBranch;

  const createNewPath = (path) => {
    let newPath = path || "";

    // Checking if we are deeper than one level, i.e. this is not the root node
    // We are creating a path of ids here, so that when we need to
    // traverse the branch we know where to go
    if (parentId) {
      newPath += "|" + parentId;
    }

    return newPath;
  };

  const handleItemCheck = (item, path) => {
    const newPath = createNewPath(path);

    onItemCheck(item, newPath);
  };

  const handleAddCell = (path, values) => {
    const newPath = createNewPath(path);

    onAddCell(newPath, values);
  };

  return (
    <List>
      <ListCell
        name={name}
        items={items}
        parentId={id}
        onItemCheck={handleItemCheck}
        onAddCell={handleAddCell}
      />
      {children &&
        children.map((individualChild) => (
          <Branch
            key={individualChild.id}
            objectBranch={individualChild}
            onItemCheck={handleItemCheck}
            onAddCell={handleAddCell}
            parentId={id}
          />
        ))}
    </List>
  );
};

Branch.propTypes = {
  objectBranch: LevelInterface,
  onItemCheck: PropTypes.func.isRequired,
  onAddCell: PropTypes.func.isRequired,
  parentId: PropTypes.string || null,
};

export default Branch;
