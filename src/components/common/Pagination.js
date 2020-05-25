import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Debugger from "./Debugger";

const ListItem = ({ text, isEnabled, isActive, onClick }) => {
  return (
    <li
      className={
        "page-item" +
        (isEnabled ? "" : " disabled") +
        (isActive ? " active" : "")
      }
    >
      <Link
        to=""
        className="page-link"
        onClick={() => onClick(0)}
        style={{ cursor: "pointer" }}
      >
        {text}
      </Link>
    </li>
  );
};

function createPager(start, totalCount, pageSize) {
  var totalPageCount = Math.ceil(totalCount / pageSize);
  const selectedPage = Math.floor(start / pageSize);

  var startPage, endPage;
  if (totalPageCount <= 10) {
    // less than 10, show all, e.g. 1..7
    startPage = 0;
    endPage = totalPageCount - 1;
  } else {
    // more than 10
    if (selectedPage <= 5) {
      // show 0..9
      startPage = 0;
      endPage = 9;
    } else if (selectedPage + 5 >= totalPageCount) {
      // show from (PageCount - 10)
      startPage = totalPageCount - 10;
      endPage = totalPageCount - 1;
    } else {
      // show 5 before and 4 after the current page
      startPage = selectedPage - 5;
      endPage = selectedPage + 4;
    }
  }

  // create pages
  const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => {
    const index = startPage + i;
    const start = index * pageSize;
    const isSelected = index === selectedPage;
    return {
      index,
      start,
      isSelected,
    };
  });

  return {
    start,
    totalCount,
    totalPageCount,
    selectedPage,
    pageSize,
    pages,
    canNextPage: selectedPage < totalPageCount - 1,
    canPreviousPage: selectedPage > 0,
  };
}

const Pagination = ({
  start,
  totalCount,
  pageSize,
  onChangePage,
  onChangePageSize,
}) => {
  const [isDebug] = useState(false);

  const pager = createPager(start, totalCount, pageSize);

  function handleSelectPageSize(pageSize, e) {
    e.preventDefault();

    onChangePageSize(parseInt(pageSize));
  }

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div>
            <ul className="pagination p-0">
              <ListItem
                text="First"
                isEnabled={pager.canPreviousPage}
                isActive={false}
                onClick={() => onChangePage(0)}
              />
              <ListItem
                text="Previous"
                isEnabled={pager.canPreviousPage}
                isActive={false}
                onClick={() =>
                  onChangePage((pager.selectedPage - 1) * pager.pageSize)
                }
              />
              {pager.pages.map((page, index) => {
                return (
                  <ListItem
                    key={index}
                    text={(page.index + 1).toString(10)}
                    isEnabled={true}
                    isActive={page.isSelected}
                    onClick={() => onChangePage(page.start)}
                  />
                );
              })}
              <ListItem
                text="Next"
                isEnabled={pager.canNextPage}
                isActive={false}
                onClick={() =>
                  onChangePage((pager.selectedPage + 1) * pager.pageSize)
                }
              />
              <ListItem
                text="Last"
                isEnabled={pager.canNextPage}
                isActive={false}
                onClick={() =>
                  onChangePage((pager.totalPageCount - 1) * pager.pageSize)
                }
              />
            </ul>
          </div>
          <div>
            <form className="form-inline">
              <div className="form-group mb-2">
                <label className="pr-2" htmlFor="inputPageSize">
                  Items Per Page:
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => handleSelectPageSize(e.target.value, e)}
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
        <div className="row">
          <div>{isDebug ? <Debugger pager={pager} /> : ""}</div>
        </div>
      </div>
    </>
  );
};

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Pagination.propTypes = {
  start: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangePageSize: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    start: state.songFilter.start,
    totalCount: state.songFilter.totalCount,
    pageSize: state.songFilter.pageSize,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
