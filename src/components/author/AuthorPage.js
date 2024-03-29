/* eslint-disable react/display-name */
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
import {
  isNewEditable,
  itemToEditable,
  editableToItem,
  createNewEditable,
  resetEditable,
  resetNewEditable,
  getActionsCellProps,
  getNewActionsCellProps,
  getEditableCellProps,
  getNewEditableCellProps,
} from "../../core/inlineEditTable";
import Debugger from "../common/Debugger";
import confirm from "../confirm";

const FILTER_COLUMN = "name";

const NewAuthor = {
  id: null,
  name: "",
  slug: "",
};

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
  const [filter, setFilter] = useState({ id: FILTER_COLUMN, value: "" });
  const [authors, setAuthors] = useState(null);
  const [errors, setErrors] = useState({});
  const [newAuthor, setNewAuthor] = useState(null);
  const [isDebug] = useState(false);

  // Page load
  useEffect(() => {
    setNewAuthor(createNewEditable(NewAuthor));

    if (!props.authors) loadAuthors();
  }, []);

  // Authors changed
  useEffect(() => {
    if (!authors && props.authors) {
      setAuthors(props.authors.map((a) => itemToEditable(a)));
    }
  }, [props.authors]);

  // After data changes, we turn the flag back off so that if data actually changes when we're not  editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [authors]);

  function isValid(author) {
    const { name } = author;

    const errors = {};

    if (!name) errors.name = "Name is required.";

    setErrors(errors);

    // Form is valid if the errors object still has no properties
    return isEmpty(errors);
  }

  const addAuthor = (author) => {
    authors.push(author);
  };

  const updateAuthor = (author) => {
    if (isNewEditable(author)) {
      setNewAuthor(author);
    } else setAuthors(authors.map((a) => (a.id === author.id ? author : a)));
  };

  const removeAuthor = (author) => {
    setAuthors(authors.filter((a) => a.id !== author.id));
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
    if (isNewEditable(author)) setNewAuthor(resetNewEditable(newAuthor));
    else {
      setSkipPageReset(true);
      updateAuthor(resetEditable(author));
    }
  };

  const handleSave = (author) => {
    if (!isValid(author)) return;

    saveAuthor(editableToItem(author), true)
      .then((savedAuthor) => {
        if (author.id) updateAuthor(itemToEditable(savedAuthor));
        else {
          addAuthor(itemToEditable(savedAuthor));
          setNewAuthor(createNewEditable());
        }

        showInfo("Data has been saved successfully");
        setTimeout(() => {
          dismissInfo();
        }, 5000);
      })
      .catch((error) => {
        showError(getErrorMessage(error));
      });
  };

  const handleDelete = async (author) => {
    const result = await confirm.show({
      message: `Are you sure to delete?`,
    });
    if (!result) {
      return;
    }

    deleteAuthor(author.id, true)
      .then(() => {
        removeAuthor(author);

        showInfo("Data has been deleted successfully");
        setTimeout(() => {
          dismissInfo();
        }, 5000);
      })
      .catch((error) => {
        showError(getErrorMessage(error));
      });
  };

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
      width: 300,
      Cell: (props) => (
        <EditableCell {...getEditableCellProps(props, handleChange)} />
      ),
      Footer: (props) => (
        <EditableCell
          {...getNewEditableCellProps(props, newAuthor, handleChange)}
        />
      ),
    },
    {
      Header: "Slug",
      accessor: "slug",
      width: 300,
      disableSortBy: true,
    },
    {
      Header: "Actions",
      width: 90,
      disableSortBy: true,
      Cell: (props) => (
        <ActionsCell
          {...getActionsCellProps(
            props,
            handleEdit,
            handleSave,
            handleCancel,
            handleDelete
          )}
        />
      ),
      Footer: () => (
        <ActionsCell
          {...getNewActionsCellProps(
            newAuthor,
            handleEdit,
            handleSave,
            handleCancel,
            handleDelete
          )}
        />
      ),
    },
  ]);

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter({ id: FILTER_COLUMN, value });
  };

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
      <div>
        <form>
          <div className="form-group row">
            <label htmlFor="inputFilter" className="col-sm-1 col-form-label">
              Filter:
            </label>
            <div className="col-sm-4">
              <input
                value={filter.value}
                onChange={handleFilterChange}
                placeholder={"Author Name"}
                className="form-control"
                id="inputFilter"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="">
        <Table
          columns={columns}
          data={authors}
          dataFilters={[filter]}
          skipPageReset={skipPageReset}
        />
      </div>
      <div>
        {isDebug ? <Debugger newAuthor={newAuthor} authors={authors} /> : ""}
      </div>
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
