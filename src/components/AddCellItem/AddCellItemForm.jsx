import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { UUIDV4_NAMESPACE } from "../../constants";

import useForm from "../../hooks/useForm";

const AddCellForm = ({ onSubmit }) => {
  const { values, handleChange, handleSubmit } = useForm(
    {
      name: "",
      id: uuidv4(UUIDV4_NAMESPACE),
      checked: false,
    },
    onSubmit
  );

  return (
    <form data-testid="addNodeItemForm" onSubmit={handleSubmit}>
      <input
        onChange={(e) => handleChange(e)}
        name="name"
        value={values.name}
        placeholder="name"
      />
      <button type="submit">Add Item!</button>
    </form>
  );
};

AddCellForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddCellForm;
