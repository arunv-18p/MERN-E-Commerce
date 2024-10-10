import React, { useEffect, useState } from "react";
import PageLayout from "../../../components/page-layout/PageLayout";
import AccountMenu from "../../../components/user/account-menu/AccountMenu";
import Loader from "../../../components/loader/Loader";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./AdminUserList.scss";
import { getAllUsers, getUserSlice } from "../../../features/userSlice";

const AdminUserList = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { splitUsers, loading } = useSelector(getUserSlice);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <PageLayout>
      {loading || splitUsers.length === 0 ? (
        <Loader />
      ) : (
        <div>
          <div className="bg-light">
            <div className="container-fluid">
              <div className="row py-4 px-2">
                <nav aria-label="breadcrumb col-12">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Product List
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="container-fluid p-4">
            <div className="row g-3">
              <div className="col-lg-3">
                <AccountMenu current="admin-product-list" />
              </div>
              <div className="col-lg-9">
                <table
                  class="table table-stripped table-bordered table-hover shadow"
                  id="productsTable"
                >
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">id</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Ph Code</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">State</th>
                      <th scope="col">Country</th>
                      <th scope="col">Role</th>
                      <th scope="col">Created At</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {splitUsers[page].map((user, key) => {
                      return (
                        <tr>
                          <th scope="row" className="ellipses">
                            {key}
                          </th>
                          <td className="ellipses">{user._id}</td>
                          <td className="ellipses">{user.firstName}</td>
                          <td className="ellipses">{user.lastName}</td>
                          <td className="ellipses">{user.emailAddress}</td>
                          <td className="ellipses">{user.phCode}</td>
                          <td className="ellipses">{user.phoneNumber}</td>
                          <td className="ellipses">{user.state}</td>
                          <td className="ellipses">{user.country}</td>
                          <td className="ellipses">{user.role}</td>
                          <td className="ellipses">{user.createdAt}</td>
                          <td><button className="btn btn-primary">Edit</button></td>
                          <td><button className="btn btn-danger">Delete</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <nav className="float-end mt-3">
                  {splitUsers.length > 1 && (
                    <PaginationControl
                      page={page}
                      between={1}
                      total={20}
                      limit={1}
                      changePage={(page) => {
                        setPage(page);
                      }}
                      ellipsis={1}
                    />
                  )}
                </nav>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      )}
    </PageLayout>
  );
};

export default AdminUserList;
