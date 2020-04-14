import React, { useState } from "react";
import PropTypes from "prop-types";

import AddCellItemForm from "./AddCellItemForm";

const AddCellItem = ({ onAddCellItem }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div style={{ display: open ? "initial" : "none" }}>
        <AddCellItemForm onSubmit={onAddCellItem} />
      </div>
      <button onClick={toggleOpen}>Add a new item!</button>
    </>
  );
};

AddCellItem.propTypes = {
  onAddCellItem: PropTypes.func.isRequired,
};

export default AddCellItem;
