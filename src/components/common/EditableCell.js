/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  onChange,
  editable,
}) {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const handleBlur = () => {
    onChange(index, id, value);
  };

  // If the initialValue is changed externall, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!editable) {
    return `${initialValue}`;
  }

  return <input value={value} onChange={handleChange} onBlur={handleBlur} />;
}

EditableCell.propTypes = {
  value: PropTypes.string,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  updateData: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
};
