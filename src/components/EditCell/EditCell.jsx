import React from "react";

import PropTypes from "prop-types";

import EditCellForm from "./EditCellForm";

import useOpen from "../../hooks/useOpen";

const EditCellName = ({ onEditCellName }) => {
  const { open, toggleOpen } = useOpen(false);

  const handleSubmission = (values) => {
    toggleOpen();
    onEditCellName(values);
  };

  return (
    <>
      <div style={{ display: open ? "initial" : "none" }}>
        <EditCellForm onSubmit={handleSubmission} />
      </div>
      <button onClick={toggleOpen}>Edit Name!</button>
    </>
  );
};

EditCellName.propTypes = {
  onEditCellName: PropTypes.func.isRequired,
};

export default EditCellName;
