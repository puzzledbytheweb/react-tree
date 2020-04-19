import { PATH_SEPARATOR } from "../../constants";

export const recursivelyUpdateNodePath = (node, parentNodePath) => {
  node.nodePath = `${node.id}|${parentNodePath}`;

  if (node.children && node.children.length > 0)
    node.children.forEach((childNode) =>
      recursivelyUpdateNodePath(childNode, node.nodePath)
    );
};

export const findTreeNode = (tree, path) => {
  let currentParentNode = null;

  if (!path) return currentParentNode;

  const splittedPath = path.split(PATH_SEPARATOR).reverse();

  // Finding the node
  for (let i = 0; i < splittedPath.length; i++) {
    if (i === 0) {
      currentParentNode = tree.find((node) => node.id === splittedPath[i]);
    } else {
      currentParentNode = currentParentNode.children.find(
        (node) => node.id === splittedPath[i]
      );
    }
  }

  return currentParentNode;
};

export const deleteTreeNode = (tree, path) => {
  const splittedPath = path.split(PATH_SEPARATOR).reverse();

  let currentParentNode = null;

  for (let i = 0; i < splittedPath.length; i++) {
    // Making sure that currentParentNode is not null when needed
    if (i === 0) {
      currentParentNode = tree.find((node) => node.id === splittedPath[i]);
    } else {
      const nextParentNode = currentParentNode.children.find(
        (node) => node.id === splittedPath[i]
      );

      // We're checking if nextParentNode has children, if it doesn't it means we are on a leaf
      // So we maintain the currentParentNode se we delete via its children
      // We're also checking if we are on the node we want to delete, so we don't end up just
      // deleting a child
      if (nextParentNode.children && i !== splittedPath.length - 1) {
        currentParentNode = nextParentNode.children.length
          ? nextParentNode
          : currentParentNode;
      }
    }

    // Checking if we want to delete root
    if (splittedPath.length === 1) {
      const nodeToDeleteIndex = tree.findIndex(
        (node) => node.id === splittedPath[i]
      );

      tree.splice(nodeToDeleteIndex, 1);
    } else if (i === splittedPath.length - 1) {
      // Checking if we are in previous to last node so we can delete correct child
      const childToDeleteIndex = currentParentNode.children.findIndex(
        (node) => node.id === splittedPath[i]
      );

      currentParentNode.children.splice(childToDeleteIndex, 1);
    }
  }

  return tree;
};
