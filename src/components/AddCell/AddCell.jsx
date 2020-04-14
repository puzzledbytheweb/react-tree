import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE } from "../../constants";

import useOpen from "../../hooks/useOpen";

import FormWithNameInput from "../FormWithNameInput/FormWithNameInput";

const AddCell = ({ onAddCell }) => {
  const { open, toggleOpen } = useOpen(false);

  const handleSubmission = (values) => {
    toggleOpen();
    onAddCell(values);
  };

  return (
    <>
      <div style={{ display: open ? "initial" : "none" }}>
        <FormWithNameInput
          data-testid="editNodeForm"
          onSubmit={handleSubmission}
          initialValues={{
            name: "",
            id: uuidv4(UUIDV4_NAMESPACE),
            children: null,
          }}
        />
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
