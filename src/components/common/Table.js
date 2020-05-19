/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Table.css";

export default function Table({ columns, data, onChange, skipPageReset }) {
  const [filterInput, setFilterInput] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy, filters, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      onChange,
      autoResetPage: !skipPageReset,
      autoResetSelectedRows: !skipPageReset,
      disableMultiSort: true,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("name", value);
    setFilterInput(value);
  };

  return (
    <div className="container">
      <div className="row">
        <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Filter name"}
        />
      </div>
      <div className="row pt-2">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div>
                      <span {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        <span title="Sort" style={{ float: "right" }}>
                          {!column.disableSortBy ? (
                            <FontAwesomeIcon
                              icon={
                                column.isSorted
                                  ? column.isSortedDesc
                                    ? "sort-down"
                                    : "sort-up"
                                  : "sort"
                              }
                              color={column.isSorted ? "black" : "gray"}
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render("Cell", {
                          editable: cell.column.editable,
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="row justify-content-between pt-2">
        <div>
          <ul className="pagination pl-0">
            <li className={"page-item" + (!canPreviousPage ? " disabled" : "")}>
              <a
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  gotoPage(0);
                }}
                style={{ cursor: "pointer" }}
              >
                First
              </a>
            </li>
            <li className={"page-item" + (!canPreviousPage ? " disabled" : "")}>
              <a
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  previousPage();
                }}
                style={{ cursor: "pointer" }}
              >
                Previous
              </a>
            </li>
            <span className="pt-2 px-2">Page</span>
            <input
              type="number"
              min={1}
              max={pageCount}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "50px" }}
            />
            <span className="pt-2 px-2">of {pageOptions.length}</span>
            <li className={"page-item" + (!canNextPage ? " disabled" : "")}>
              <a
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  nextPage();
                }}
                style={{ cursor: "pointer" }}
              >
                Next
              </a>
            </li>
            <li className={"page-item" + (!canNextPage ? " disabled" : "")}>
              <a
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  gotoPage(pageCount - 1);
                }}
                style={{ cursor: "pointer" }}
              >
                Last
              </a>
            </li>
          </ul>
        </div>
        <div>
          <form className="form-inline">
            <div className="form-group mb-2">
              <label className="pr-1" htmlFor="inputPageSize">
                Items Per Page
              </label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                className="form-control form-control-sm"
                id="inputPageSize"
              >
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      {/* Debugging */}
      <div className="row">
        <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
                sortBy,
                filters,
                selectedRowIds: selectedRowIds,
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
