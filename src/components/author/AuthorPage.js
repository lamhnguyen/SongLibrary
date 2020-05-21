import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../common/Table";
import EditableCell from "../common/EditableCell";
import ActionsCell from "../common/ActionsCell";
import Spinner from "../common/Spinner";
import {
  loadAuthors,
  saveAuthor,
  deleteAuthor,
} from "../../actions/authorActions";
import { showInfo, showError, dismissInfo } from "../../actions/alertActions";
import { getErrorMessage } from "../../api/apiHelper";
import { isEmpty } from "../../core/helper";

export function AuthorPage({
  isLoading,
  loadAuthors,
  saveAuthor,
  deleteAuthor,
  showInfo,
  showError,
  dismissInfo,
  ...props
}) {
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [authors, setAuthors] = useState(null);
  const [errors, setErrors] = useState({});

  function isValid(author) {
    const { name } = author;

    const errors = {};

    if (!name) errors.name = "Name is required.";

    setErrors(errors);

    // Form is valid if the errors object still has no properties
    return isEmpty(errors);
  }

  const updateAuthor = (author) => {
    setAuthors(authors.map((a) => (a.id === author.id ? author : a)));
  };

  const handleChange = (author, name, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    updateAuthor({ ...author, [name]: value });
  };

  const handleEdit = (author) => {
    updateAuthor({ ...author, isEditing: true });
  };

  const handleCancel = (author) => {
    updateAuthor({ ...author.original, isEditing: false });
  };

  const handleSave = (author) => {
    if (!isValid(author)) return;

    saveAuthor(author, true)
      .then(() => {
        showInfo("Data has been saved successfully");
        setTimeout(() => {
          dismissInfo();
        }, 5000);
      })
      .catch((error) => {
        showError(getErrorMessage(error));
      });

    setAuthors(
      authors.map((a) =>
        a.id === author.id ? { ...a, isEditing: false, original: a } : a
      )
    );
  };

  const handleDelete = (author) => {
    deleteAuthor(author.id, true)
      .then(() => {
        setAuthors(authors.filter((a) => a.id !== author.id));

        showInfo("Data has been deleted successfully");
        setTimeout(() => {
          dismissInfo();
        }, 5000);
      })
      .catch((error) => {
        showError(getErrorMessage(error));
      });
  };

  const getActionsCellProps = ({ row }) => {
    if (!row) return {};

    const author = row.original;
    const actionProps = {
      isEditing: author.isEditing,
      onEdit: () => handleEdit(author),
      onSave: () => handleSave(author),
      onCancel: () => handleCancel(author),
      onDelete: () => handleDelete(author),
    };

    return actionProps;
  };

  const getEditableCellProps = ({ row, column, value }) => {
    if (!row || !column) return {};

    const author = row.original;
    const actionProps = {
      isEditing: author.isEditing,
      value,
      onChange: (value) => handleChange(author, column.id, value),
    };

    return actionProps;
  };

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
      // eslint-disable-next-line react/display-name, react/prop-types
      Cell: (props) => <EditableCell {...getEditableCellProps(props)} />,
    },
    {
      Header: "Slug",
      accessor: "slug",
      disableSortBy: true,
    },
    {
      Header: "Actions",
      maxWidth: 10,
      // eslint-disable-next-line react/display-name, react/prop-types
      Cell: (props) => <ActionsCell {...getActionsCellProps(props)} />,
      disableSortBy: true,
    },
  ]);

  // Page load
  useEffect(() => {
    if (!props.authors) loadAuthors();
  }, []);

  // Authors loaded
  useEffect(() => {
    if (!authors && props.authors) {
      setAuthors(
        props.authors.map((a) => ({
          ...a,
          isEditing: false,
          original: a,
        }))
      );
    }
  }, [props.authors]);

  // After data chagnes, we turn the flag back off so that if data actually changes when we're not  editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [authors]);

  if (isLoading || !authors)
    return (
      <div className="container">
        <Spinner />
      </div>
    );

  return (
    <div>
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger my-2" role="alert">
          <ul>
            {Object.keys(errors).map((err, index) => (
              <li key={index}>{errors[err]}</li>
            ))}
          </ul>
        </div>
      )}
      <Table
        columns={columns}
        data={authors}
        onChange={handleChange}
        skipPageReset={skipPageReset}
      />
    </div>
  );
}

AuthorPage.propTypes = {
  authors: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  showInfo: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  dismissInfo: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    isLoading: state.apiStatus.count > 0,
  };
}

const mapDispatchToProps = {
  loadAuthors,
  saveAuthor,
  deleteAuthor,
  showInfo,
  showError,
  dismissInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
