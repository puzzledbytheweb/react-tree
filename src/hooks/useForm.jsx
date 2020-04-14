import { useState } from "react";

const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const newValues = Object.assign({}, values);

    newValues[e.target.name] = e.target.value;

    setValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(values);
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
