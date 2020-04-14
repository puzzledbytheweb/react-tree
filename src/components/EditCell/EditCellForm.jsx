import React from "react";
import PropTypes from "prop-types";

import FormWithNameInput from "../FormWithNameInput/FormWithNameInput";

const EditCellForm = ({ onSubmit }) => {
  return (
    <FormWithNameInput
      data-testid="editNodeForm"
      onSubmit={onSubmit}
      initialValues={{ name: "" }}
    />
  );
};

EditCellForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EditCellForm;
