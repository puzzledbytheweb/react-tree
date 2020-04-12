import Proptypes from "prop-types";

export const CellInterface = Proptypes.shape({
  name: Proptypes.string.isRequired,
  id: Proptypes.string.isRequired,
  child: Proptypes.arrayOf(Proptypes.shape(this)),
});
