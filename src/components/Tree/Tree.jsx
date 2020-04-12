import React from "react";
import Proptypes from "prop-types";

const Tree = ({ objectTree }) => {
  return <div></div>;
};

// Recursive type where child will be an array of identical objects
const ItemShape = {
  name: Proptypes.string.isRequired,
  id: Proptypes.string.isRequired,
  child: Proptypes.arrayOf(Proptypes.shape(this)) || null,
};

Tree.propTypes = {
  objectTree: Proptypes.shape(ItemShape).isRequired,
};

export default Tree;
