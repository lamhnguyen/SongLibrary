import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
  };
}

const Pagination = ({
  start,
  totalCount,
  pageSize,
  onChangePage,
  onChangePageSize,
}) => {
  const pager = createPager(start, totalCount, pageSize);

  function handleClickPage(start, e) {
    e.preventDefault();

    onChangePage(start);
  }

  function handleSelectPageSize(pageSize, e) {
    e.preventDefault();

    onChangePageSize(parseInt(pageSize));
  }

  return (
    <>
      <div>
        <ul className="pagination">
          <li
            className={
              "page-item" + (pager.selectedPage === 0 ? " disabled" : "")
            }
          >
            <a className="page-link" onClick={(e) => handleClickPage(0, e)}>
              First
            </a>
          </li>
          <li
            className={
              "page-item" + (pager.selectedPage === 0 ? " disabled" : "")
            }
          >
            <a
              className="page-link"
              onClick={(e) =>
                handleClickPage((pager.selectedPage - 1) * pager.pageSize, e)
              }
            >
              Previous
            </a>
          </li>
          {pager.pages.map((page, index) => {
            return (
              <li
                key={index}
                className={"page-item" + (page.isSelected ? " active" : "")}
              >
                <a
                  className="page-link"
                  onClick={(e) => handleClickPage(page.start, e)}
                >
                  {page.index + 1}
                </a>
              </li>
            );
          })}
          <li
            className={
              "page-item" +
              (pager.selectedPage === pager.totalPageCount - 1
                ? " disabled"
                : "")
            }
          >
            <a
              className="page-link"
              onClick={(e) =>
                handleClickPage((pager.selectedPage + 1) * pager.pageSize, e)
              }
            >
              Next
            </a>
          </li>
          <li
            className={
              "page-item" +
              (pager.selectedPage === pager.totalPageCount - 1
                ? " disabled"
                : "")
            }
          >
            <a
              className="page-link"
              onClick={(e) =>
                handleClickPage((pager.totalPageCount - 1) * pager.pageSize, e)
              }
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
    </>
  );
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
