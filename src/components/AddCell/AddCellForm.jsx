import React, { useState } from "react";
import PropTypes from "prop-types";

import { UUIDV4_NAMESPACE } from "../../constants";

import { v4 as uuidv4 } from "uuid";

const AddCellForm = ({ onSubmit }) => {
  const [values, setValues] = useState({
    name: "",
    id: uuidv4(UUIDV4_NAMESPACE),
    children: null,
  });

  const handleChange = (e) => {
    const newValues = Object.assign({}, values);

    newValues[e.target.name] = e.target.value;

    setValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(values);
  };

  return (
    <form data-testid="addNodeForm" onSubmit={handleSubmit}>
      <input
        onChange={(e) => handleChange(e)}
        name="name"
        value={values.name}
        placeholder="name"
      />
      <button type="submit">Create!</button>
    </form>
  );
};

AddCellForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddCellForm;
