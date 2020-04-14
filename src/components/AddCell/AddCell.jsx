import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <Button size="xs" outline color="success" onClick={toggleOpen}>
        <FontAwesomeIcon size="xs" icon="plus-circle" />
      </Button>
    </>
  );
};
AddCell.propTypes = {
  onAddCell: PropTypes.func.isRequired,
};

export default AddCell;
