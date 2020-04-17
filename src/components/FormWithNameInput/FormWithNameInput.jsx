import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "reactstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useForm from "../../hooks/useForm";

const StyledForm = styled(Form)`
  display: flex;
`;

const FormWithNameInput = ({ onSubmit, initialValues }) => {
  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    onSubmit
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        onChange={(e) => handleChange(e)}
        name="name"
        value={values.name}
        placeholder="name"
      />
      <Button color="success" size="xs" type="submit">
        <FontAwesomeIcon icon="check" />
      </Button>
    </StyledForm>
  );
};

FormWithNameInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default FormWithNameInput;
