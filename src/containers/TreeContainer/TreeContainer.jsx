import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE } from "../../constants";

import Tree from "../../components/Tree/Tree";

const TreeContainer = () => {
  const [tree, setTree] = useState([
    {
      name: "yo",
      id: uuidv4(UUIDV4_NAMESPACE),
      child: [{ name: "yo.yo", id: uuidv4(UUIDV4_NAMESPACE), child: null }],
    },
  ]);

  return <Tree objectTree={tree} />;
};

TreeContainer.propTypes = {};

export default TreeContainer;
