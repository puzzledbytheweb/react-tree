import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <Button color="warning" size="xs" onClick={toggleOpen}>
        <FontAwesomeIcon size="xs" icon="pencil-alt" />
      </Button>
    </>
  );
};

EditCellName.propTypes = {
  onEditCellName: PropTypes.func.isRequired,
};

export default EditCellName;
