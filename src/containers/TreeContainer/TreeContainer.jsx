import React, { useState } from "react";
import PropTypes from "prop-types";

import Tree from "../../components/Tree/Tree";

const TreeContainer = () => {
  const [tree, setTree] = useState([
    {
      name: "yo",
      id: "1",
      child: null,
    },
  ]);

  return <Tree objectTree={tree} />;
};

TreeContainer.propTypes = {};

export default TreeContainer;
