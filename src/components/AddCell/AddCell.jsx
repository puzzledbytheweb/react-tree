import React, { useState } from "react";

import PropTypes from "prop-types";

import AddCellForm from "./AddCellForm";

const AddCell = ({ onAddCell }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div style={{ display: open ? "initial" : "none" }}>
        <AddCellForm onSubmit={onAddCell} />
      </div>
      <button onClick={toggleOpen}>Add a new location!</button>
    </>
  );
};
AddCell.propTypes = {
  onAddCell: PropTypes.func.isRequired,
};

export default AddCell;
