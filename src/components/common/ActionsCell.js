/* eslint-disable react/jsx-key */
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ title, icon, color, onClick }) => (
  <button className="btn py-0 px-1" title={title} onClick={onClick}>
    <FontAwesomeIcon icon={icon} color={color} fixedWidth />
  </button>
);

export default function ActionsCell({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) {
  return isEditing ? (
    <>
      <Button title="Save" icon="check" color="#5cb85c" onClick={onSave} />
      <Button title="Cancel" icon="times" color="#d9534f" onClick={onCancel} />
    </>
  ) : (
    <>
      <Button title="Edit" icon="edit" color="#5cb85c" onClick={onEdit} />
      <Button title="Delete" icon="trash" color="#d9534f" onClick={onDelete} />
    </>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ActionsCell.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
