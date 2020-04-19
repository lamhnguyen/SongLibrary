import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="container">
    <div className="row">
      <button type="button" className="btn btn-outline-primary btn-sm mr-1">
        New
      </button>
      <button type="button" className="btn btn-outline-secondary btn-sm mr-1">
        Popular
      </button>
      <button type="button" className="btn btn-outline-success btn-sm mr-1">
        Recent
      </button>
      <button type="button" className="btn btn-outline-danger btn-sm mr-1">
        Random
      </button>
    </div>
    <div className="row pt-3">
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ width: "55%" }}>Name</th>
              <th style={{ width: "20%" }}>Authors</th>
              <th style={{ width: "20%" }}>Performers</th>
              <th style={{ width: "5%" }}>Views</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="#">
                  <strong>CHO CON </strong>
                </Link>
                <br />
                <em>Ba [C] sẽ là cánh [Dm] chim Đưa [F] con đi thật...</em>
              </td>
              <td>
                <Link to="#">Vũ Khanh</Link>, <Link to="#">Ngọc Lan</Link>
              </td>
              <td>
                <Link to="#">Phạm Trọng Cầu</Link>,{" "}
                <Link to="#">Tuấn Dũng</Link>
              </td>
              <td>58909</td>
            </tr>
            <tr>
              <td>
                <Link to="#">
                  <strong>NGÀY ĐẦU TIÊN ĐI HỌC </strong>
                </Link>
                <br />
                <em>1. Ngày [A] đầu tiên đi học Mẹ [Bm] dắt tay đến...</em>
              </td>
              <td>
                <Link to="#">Nguyễn Ngọc Thiện</Link>
              </td>
              <td>
                <Link to="#">Hồ Quỳnh Hương</Link>
              </td>
              <td>35690</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="row d-flex justify-content-between">
      <div>
        <ul className="pagination">
          <li className="page-item disabled">
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="#">
              2 <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
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
            <select className="form-control form-control-sm" id="inputPageSize">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default HomePage;
