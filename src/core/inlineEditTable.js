export const itemToEditable = (item) => {
  return {
    ...item,
    isEditing: false,
    original: { ...item },
  };
};

export const editableToItem = (editableItem) => {
  const item = { ...editableItem };

  delete item["isEditing"];
  delete item["original"];

  return item;
};

export const createNewEditable = (newItem) => {
  return {
    ...itemToEditable(newItem),
    isEditing: true,
  };
};

export const isEditing = (editableItem) => editableItem.isEditing;

export const isNewEditable = (editableItem) =>
  !editableItem.id ? true : false;

export const resetEditable = (editableItem) => {
  return {
    ...itemToEditable(editableItem.original),
    isEditing: false,
  };
};

export const resetNewEditable = (newEditableItem) => {
  return {
    ...itemToEditable(newEditableItem.original),
    isEditing: true,
  };
};

export const getActionsCellProps = (
  cellProps,
  onEdit,
  onSave,
  onCancel,
  onDelete
) => {
  const { row } = cellProps;
  return createActionsCellProps(
    row.original,
    onEdit,
    onSave,
    onCancel,
    onDelete
  );
};

export const getNewActionsCellProps = (
  newEditableItem,
  onEdit,
  onSave,
  onCancel,
  onDelete
) => {
  return createActionsCellProps(
    newEditableItem,
    onEdit,
    onSave,
    onCancel,
    onDelete
  );
};

const createActionsCellProps = (
  editableItem,
  onEdit,
  onSave,
  onCancel,
  onDelete
) => {
  const actionsProps = {
    isEditing: isEditing(editableItem),
    onEdit: () => onEdit(editableItem),
    onSave: () => onSave(editableItem),
    onCancel: () => onCancel(editableItem),
    onDelete: () => onDelete(editableItem),
  };
  return actionsProps;
};

export const getEditableCellProps = (cellProps, onChange) => {
  const { row, column, value } = cellProps;
  return createEditableCellProps(row.original, column.id, value, onChange);
};

export const getNewEditableCellProps = (cellProps, newAuthor, onChange) => {
  const name = cellProps.column.id;
  return createEditableCellProps(newAuthor, name, newAuthor[name], onChange);
};

const createEditableCellProps = (editableItem, name, value, onChange) => {
  const editableProps = {
    isEditing: isEditing(editableItem),
    value,
    onChange: (value) => onChange(editableItem, name, value),
  };
  return editableProps;
};
