import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import CreataleSelect from "react-select/creatable";

const MultiSelectInput = ({
  name,
  label,
  creatable,
  onChange,
  onCreate,
  placeholder,
  value,
  error,
  options,
}) => {
  const selectedValues = options.filter((option) =>
    value.includes(option.value)
  );

  const MultiSelect = creatable ? CreataleSelect : Select;
  var onCreateOptionProp = creatable
    ? {
        onCreateOption: (newValue) => onCreate(newValue, name),
      }
    : {};

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <MultiSelect
          name={name}
          onChange={(selectedOptions) =>
            onChange(
              selectedOptions
                ? selectedOptions.map((option) => option.value)
                : [],
              name
            )
          }
          {...onCreateOptionProp}
          placeholder={placeholder}
          value={selectedValues}
          options={options}
          isMulti
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

MultiSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  creatable: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.array.isRequired,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default MultiSelectInput;
