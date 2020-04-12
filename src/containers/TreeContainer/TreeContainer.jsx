import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE } from "../../constants";

import Tree from "../../components/Tree/Tree";

const TreeContainer = () => {
  const initialTree = [
    {
      name: "yo",
      id: uuidv4(UUIDV4_NAMESPACE),
      items: [{ name: "yo.item", id: uuidv4(UUIDV4_NAMESPACE), checked: true }],
      children: [
        {
          name: "yo.yo",
          id: uuidv4(UUIDV4_NAMESPACE),
          items: [
            { name: "yo.yo.item", id: uuidv4(UUIDV4_NAMESPACE), checked: true },
          ],
          children: [
            {
              name: "yo.yo.yo",
              id: uuidv4(UUIDV4_NAMESPACE),
              children: null,
              items: [
                {
                  name: "yo.yo.yo.item",
                  id: uuidv4(UUIDV4_NAMESPACE),
                  checked: true,
                },
              ],
            },
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
  ];

  return <Tree initialTree={initialTree} />;
};

TreeContainer.propTypes = {};

export default TreeContainer;
