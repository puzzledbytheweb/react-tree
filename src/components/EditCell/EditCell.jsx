import React from "react";
import PropTypes from "prop-types";

import { ButtonFit } from "../Styled/Styled";

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
      <ButtonFit onClick={toggleOpen}>Edit Name!</ButtonFit>
    </>
  );
};

EditCellName.propTypes = {
  onEditCellName: PropTypes.func.isRequired,
};

export default EditCellName;
