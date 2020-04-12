import PropTypes from "prop-types";

// Recursive type where child will be an array of identical objects
export const CellInterface = PropTypes.shape({
  name: PropTypes.string.isRequired,
  // ID should be unique, use
  id: PropTypes.string.isRequired,
  child: PropTypes.arrayOf(PropTypes.shape(this)),
});
