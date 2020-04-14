import React from "react";
import PropTypes from "prop-types";

import useForm from "../../hooks/useForm";

const AddCellForm = ({ onSubmit }) => {
  const { values, handleChange, handleSubmit } = useForm(
    { name: "" },
    onSubmit
  );

  return (
    <form data-testid="editNodeForm" onSubmit={handleSubmit}>
      <input
        onChange={(e) => handleChange(e)}
        name="name"
        value={values.name}
        placeholder="New Name"
      />
      <button type="submit">Edit!</button>
    </form>
  );
};

AddCellForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddCellForm;
