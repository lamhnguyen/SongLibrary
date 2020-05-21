/* eslint-disable react/jsx-key */
import React from "react";
import PropTypes from "prop-types";

export default function ActionsCell({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) {
  return isEditing ? (
    <>
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </>
  ) : (
    <>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}

ActionsCell.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
