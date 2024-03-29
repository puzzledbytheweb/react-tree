import React from "react";
import PropTypes from "prop-types";

import useOpen from "../../hooks/useOpen";
import FormWithNameInput from "../FormWithNameInput/FormWithNameInput";

const ButtonWithForm = ({ onSubmit, button, formInitialValues, role }) => {
  const { open, toggleOpen } = useOpen(false);

  const handleSubmission = (values) => {
    toggleOpen();
    onSubmit(values);
  };

  return (
    <>
      <div role={role} style={{ display: open ? "initial" : "none" }}>
        <FormWithNameInput
          onSubmit={handleSubmission}
          initialValues={formInitialValues}
        />
      </div>
      {React.cloneElement(button, { onClick: toggleOpen })}
    </>
  );
};
ButtonWithForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  button: PropTypes.element.isRequired,
  formInitialValues: PropTypes.object.isRequired,
  role: PropTypes.string,
};

export default ButtonWithForm;
