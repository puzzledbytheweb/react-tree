import React from "react";

import PropTypes from "prop-types";

import AddCellForm from "./AddCellForm";
import useOpen from "../../hooks/useOpen";

const AddCell = ({ onAddCell }) => {
  const { open, toggleOpen } = useOpen(false);

  const handleSubmission = (values) => {
    toggleOpen();
    onAddCell(values);
  };

  return (
    <>
      <div style={{ display: open ? "initial" : "none" }}>
        <AddCellForm onSubmit={handleSubmission} />
      </div>
      <button onClick={toggleOpen}>Add a new location!</button>
    </>
  );
};
AddCell.propTypes = {
  onAddCell: PropTypes.func.isRequired,
};

export default AddCell;
