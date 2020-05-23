/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../common/Table";
import EditableCell from "../common/EditableCell";
import ActionsCell from "../common/ActionsCell";
import Spinner from "../common/Spinner";
import {
  loadArtists,
  saveArtist,
  deleteArtist,
} from "../../actions/artistActions";
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

const NewArtist = {
  id: null,
  name: "",
  slug: "",
};

export function ArtistPage({
  isLoading,
  loadArtists,
  saveArtist,
  deleteArtist,
  showInfo,
  showError,
  dismissInfo,
  ...props
}) {
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [filter, setFilter] = useState({ id: FILTER_COLUMN, value: "" });
  const [artists, setArtists] = useState(null);
  const [errors, setErrors] = useState({});
  const [newArtist, setNewArtist] = useState(null);
  const [isDebug] = useState(false);

  // Page load
  useEffect(() => {
    setNewArtist(createNewEditable(NewArtist));

    if (!props.artists) loadArtists();
  }, []);

  // Artists changed
  useEffect(() => {
    if (!artists && props.artists) {
      setArtists(props.artists.map((a) => itemToEditable(a)));
    }
  }, [props.artists]);

  // After data changes, we turn the flag back off so that if data actually changes when we're not  editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [artists]);

  function isValid(artist) {
    const { name } = artist;

    const errors = {};

    if (!name) errors.name = "Name is required.";

    setErrors(errors);

    // Form is valid if the errors object still has no properties
    return isEmpty(errors);
  }

  const addArtist = (artist) => {
    artists.push(artist);
  };

  const updateArtist = (artist) => {
    if (isNewEditable(artist)) {
      setNewArtist(artist);
    } else setArtists(artists.map((a) => (a.id === artist.id ? artist : a)));
  };

  const removeArtist = (artist) => {
    setArtists(artists.filter((a) => a.id !== artist.id));
  };

  const handleChange = (artist, name, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    updateArtist({ ...artist, [name]: value });
  };

  const handleEdit = (artist) => {
    updateArtist({ ...artist, isEditing: true });
  };

  const handleCancel = (artist) => {
    if (isNewEditable(artist)) setNewArtist(resetNewEditable(newArtist));
    else {
      setSkipPageReset(true);
      updateArtist(resetEditable(artist));
    }
  };

  const handleSave = (artist) => {
    if (!isValid(artist)) return;

    saveArtist(editableToItem(artist), true)
      .then((savedArtist) => {
        if (artist.id) updateArtist(itemToEditable(savedArtist));
        else {
          addArtist(itemToEditable(savedArtist));
          setNewArtist(createNewEditable());
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

  const handleDelete = async (artist) => {
    const result = await confirm.show({
      message: `Are you sure to delete?`,
    });
    if (!result) {
      return;
    }

    deleteArtist(artist.id, true)
      .then(() => {
        removeArtist(artist);

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
          {...getNewEditableCellProps(props, newArtist, handleChange)}
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
            newArtist,
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

  if (isLoading || !artists)
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
                placeholder={"Artist Name"}
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
          data={artists}
          dataFilters={[filter]}
          skipPageReset={skipPageReset}
        />
      </div>
      <div>
        {isDebug ? <Debugger newArtist={newArtist} artists={artists} /> : ""}
      </div>
    </div>
  );
}

ArtistPage.propTypes = {
  artists: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  loadArtists: PropTypes.func.isRequired,
  saveArtist: PropTypes.func.isRequired,
  deleteArtist: PropTypes.func.isRequired,
  showInfo: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  dismissInfo: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    artists: state.artists,
    isLoading: state.apiStatus.count > 0,
  };
}

const mapDispatchToProps = {
  loadArtists,
  saveArtist,
  deleteArtist,
  showInfo,
  showError,
  dismissInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
