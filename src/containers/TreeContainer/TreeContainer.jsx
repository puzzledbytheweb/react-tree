import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE } from "../../constants";

import Tree from "../../components/Tree/Tree";

const TreeContainer = () => {
  const [tree, setTree] = useState([
    {
      name: "yo",
      id: uuidv4(UUIDV4_NAMESPACE),
      children: [
        {
          name: "yo.yo",
          id: uuidv4(UUIDV4_NAMESPACE),
          children: [
            { name: "yo.yo.yo", id: uuidv4(UUIDV4_NAMESPACE), children: null },
          ],
        },
      ],
    },
    {
      name: "bo",
      id: uuidv4(UUIDV4_NAMESPACE),
      children: [
        {
          name: "bo.bo",
          id: uuidv4(UUIDV4_NAMESPACE),
          children: [
            { name: "bo.bo.bo", id: uuidv4(UUIDV4_NAMESPACE), children: null },
          ],
        },
      ],
    },
  ]);

  return <Tree objectTree={tree} />;
};

TreeContainer.propTypes = {};

export default TreeContainer;
