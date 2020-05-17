import React from "react";
import PropTypes from "prop-types";

const TextAreaInput = ({
  name,
  label,
  rows,
  cols,
  onChange,
  placeholder,
  value,
  error,
}) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <textarea
          name={name}
          rows={rows}
          cols={cols}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default TextAreaInput;
