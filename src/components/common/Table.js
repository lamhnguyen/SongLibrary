/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useBlockLayout,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Table.css";
import Debugger from "./Debugger";

export default function Table({ columns, data, dataFilters, skipPageReset }) {
  const [isDebug] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // footerGroups,
    page,
    prepareRow,
    setAllFilters,
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
      autoResetPage: !skipPageReset,
      disableMultiSort: true,
    },
    useFilters,
    useSortBy,
    usePagination,
    useBlockLayout
  );

  // Page loaded
  useEffect(() => {}, []);

  // Filters changed
  useEffect(() => {
    if (dataFilters) {
      setAllFilters(dataFilters);
    }
  }, [dataFilters]);

  return (
    <div>
      <div>
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {headerGroups.map((group) => (
              <tr {...group.getHeaderGroupProps()}>
                {group.headers.map((column) => (
                  <td {...column.getHeaderProps()}>
                    {column.render("Footer")}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-between pt-2">
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
            <span className="pt-2 px-2">Page: </span>
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
            <span className="pt-2 px-2">Page Size: </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </ul>
        </div>
      </div>
      <div>
        {isDebug ? (
          <Debugger
            table={{
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              sortBy,
              filters,
              selectedRowIds: selectedRowIds,
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  dataFilters: PropTypes.array.isRequired,
  skipPageReset: PropTypes.bool.isRequired,
};
