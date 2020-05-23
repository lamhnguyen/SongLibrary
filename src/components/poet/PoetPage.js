/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../common/Table";
import EditableCell from "../common/EditableCell";
import ActionsCell from "../common/ActionsCell";
import Spinner from "../common/Spinner";
import { loadPoets, savePoet, deletePoet } from "../../actions/poetActions";
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

const NewPoet = {
  id: null,
  name: "",
  slug: "",
};

export function PoetPage({
  isLoading,
  loadPoets,
  savePoet,
  deletePoet,
  showInfo,
  showError,
  dismissInfo,
  ...props
}) {
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [filter, setFilter] = useState({ id: FILTER_COLUMN, value: "" });
  const [poets, setPoets] = useState(null);
  const [errors, setErrors] = useState({});
  const [newPoet, setNewPoet] = useState(null);
  const [isDebug] = useState(false);

  // Page load
  useEffect(() => {
    setNewPoet(createNewEditable(NewPoet));

    if (!props.poets) loadPoets();
  }, []);

  // Poets changed
  useEffect(() => {
    if (!poets && props.poets) {
      setPoets(props.poets.map((a) => itemToEditable(a)));
    }
  }, [props.poets]);

  // After data changes, we turn the flag back off so that if data actually changes when we're not  editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [poets]);

  function isValid(poet) {
    const { name } = poet;

    const errors = {};

    if (!name) errors.name = "Name is required.";

    setErrors(errors);

    // Form is valid if the errors object still has no properties
    return isEmpty(errors);
  }

  const addPoet = (poet) => {
    poets.push(poet);
  };

  const updatePoet = (poet) => {
    if (isNewEditable(poet)) {
      setNewPoet(poet);
    } else setPoets(poets.map((a) => (a.id === poet.id ? poet : a)));
  };

  const removePoet = (poet) => {
    setPoets(poets.filter((a) => a.id !== poet.id));
  };

  const handleChange = (poet, name, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    updatePoet({ ...poet, [name]: value });
  };

  const handleEdit = (poet) => {
    updatePoet({ ...poet, isEditing: true });
  };

  const handleCancel = (poet) => {
    if (isNewEditable(poet)) setNewPoet(resetNewEditable(newPoet));
    else {
      setSkipPageReset(true);
      updatePoet(resetEditable(poet));
    }
  };

  const handleSave = (poet) => {
    if (!isValid(poet)) return;

    savePoet(editableToItem(poet), true)
      .then((savedPoet) => {
        if (poet.id) updatePoet(itemToEditable(savedPoet));
        else {
          addPoet(itemToEditable(savedPoet));
          setNewPoet(createNewEditable());
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

  const handleDelete = async (poet) => {
    const result = await confirm.show({
      message: `Are you sure to delete?`,
    });
    if (!result) {
      return;
    }

    deletePoet(poet.id, true)
      .then(() => {
        removePoet(poet);

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
          {...getNewEditableCellProps(props, newPoet, handleChange)}
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
            newPoet,
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

  if (isLoading || !poets)
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
                placeholder={"Poet Name"}
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
          data={poets}
          dataFilters={[filter]}
          skipPageReset={skipPageReset}
        />
      </div>
      <div>{isDebug ? <Debugger newPoet={newPoet} poets={poets} /> : ""}</div>
    </div>
  );
}

PoetPage.propTypes = {
  poets: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  loadPoets: PropTypes.func.isRequired,
  savePoet: PropTypes.func.isRequired,
  deletePoet: PropTypes.func.isRequired,
  showInfo: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  dismissInfo: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    poets: state.poets,
    isLoading: state.apiStatus.count > 0,
  };
}

const mapDispatchToProps = {
  loadPoets,
  savePoet,
  deletePoet,
  showInfo,
  showError,
  dismissInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(PoetPage);
