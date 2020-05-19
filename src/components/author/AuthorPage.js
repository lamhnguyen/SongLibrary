import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "../common/Table";
import EditableCell from "../common/EditableCell";
import Spinner from "../common/Spinner";
import {
  loadAuthors,
  saveAuthor,
  deleteAuthor,
} from "../../actions/authorActions";

export function AuthorPage({
  isLoading,
  loadAuthors,
  saveAuthor,
  deleteAuthor,
  ...props
}) {
  const [authors, setAuthors] = useState(null);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
      Cell: EditableCell,
      editable: true,
    },
    {
      Header: "Slug",
      accessor: "slug",
      disableSortBy: true,
      editable: false,
    },
  ]);

  // Page load
  useEffect(() => {
    if (!authors) loadAuthors();
  }, []);

  // Authors loaded
  useEffect(() => {
    if (props.authors) setAuthors(props.authors);
  }, [props.authors]);

  // After data chagnes, we turn the flag back off so that if data actually changes when we're not  editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [authors]);

  if (isLoading || !authors)
    return (
      <div className="container">
        <Spinner />
      </div>
    );

  const handleChange = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    setAuthors((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  console.log(authors);

  return (
    <div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
