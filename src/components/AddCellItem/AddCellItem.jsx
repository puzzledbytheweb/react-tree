import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE } from "../../constants";

import useOpen from "../../hooks/useOpen";

import FormWithNameInput from "../FormWithNameInput/FormWithNameInput";

const AddCellItem = ({ onAddCellItem }) => {
  const { open, toggleOpen } = useOpen(false);

  const handleSubmit = (values) => {
    toggleOpen();
    onAddCellItem(values);
  };

  return (
    <>
      <div style={{ display: open ? "initial" : "none" }}>
        <FormWithNameInput
          data-testid="editNodeForm"
          onSubmit={handleSubmit}
          initialValues={{
            name: "",
            id: uuidv4(UUIDV4_NAMESPACE),
            checked: false,
          }}
        />
      </div>
      <Button size="xs" color="primary" onClick={toggleOpen}>
        <small>Add Property</small>
      </Button>
    </>
  );
};

AddCellItem.propTypes = {
  onAddCellItem: PropTypes.func.isRequired,
};

export default AddCellItem;
