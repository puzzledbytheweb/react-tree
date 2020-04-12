import PropTypes from "prop-types";

// Recursive type where children will be an array of identical objects
export const CellInterface = PropTypes.shape({
  name: PropTypes.string.isRequired,
  // ID should be unique, use
  id: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape(this)),
});
