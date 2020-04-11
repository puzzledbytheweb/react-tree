import React from "react";

import PropTypes from "prop-types";

const ListCell = ({ children }) => {
  return <li>{children}</li>;
};

ListCell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListCell;
