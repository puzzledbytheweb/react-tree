import React from "react";

import PropTypes from "prop-types";

const ListCell = ({ name }) => {
  return (
    <li>
      <h3>{name}</h3>
    </li>
  );
};

ListCell.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ListCell;
