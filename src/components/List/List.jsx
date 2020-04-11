import React from "react";

import PropTypes from "prop-types";

const List = ({ children }) => {
  return <ol>{children}</ol>;
};

// https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
List.propTypes = {
  children: PropTypes.node.isRequired,
};

export default List;
