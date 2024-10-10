import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageLayout from "../../../components/page-layout/PageLayout";
import AccountMenu from "../../../components/user/account-menu/AccountMenu";
import AddressView from "../../../components/user/address-view/AddressView";

import React from "react";

import { changeUserPassword, getUserSlice, updateUserProfile } from "../../../features/userSlice";
import Loader from "../../../components/loader/Loader";

const Profile = () => {
  const { currentUser, loading } = useSelector(getUserSlice);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(currentUser);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const onPasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(userData));
  };
  useEffect(() => {
    if (currentUser) {
      setUserData({ ...currentUser });
    }
  }, [setUserData, currentUser]);
  return (
    <PageLayout>
      <>
        {userData == null || loading ? (
          <Loader />
        ) : (
          <div>
            <div className="bg-light">
              <div className="container-fluid">
                <div className="row py-4 px-2">
                  <nav aria-label="breadcrumb col-12">
                    <ol className="breadcrumb mb-1">
                      <li className="breadcrumb-item">
                        <Link to="#">Home</Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        My Profile
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="container-fluid p-4">
              <div className="row g-3">
                <div className="col-lg-3">
                  <AccountMenu current="profile" />
                </div>
                <div className="col-lg-9">
                  <div className="row g-3">
                    <div className="col-lg-9">
                      <div className="card border-0 shadow mb-3">
                        <div className="card-body">
                          <h4 className="card-title fw-semibold mt-2 mb-3">Profile</h4>
                          <form className="row g-3" onSubmit={submitHandler}>
                            <div className="col-md-6">
                              <label className="form-label">First Name</label>
                              <input type="text" name="firstName" className="form-control" value={userData.firstName} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Last Name</label>
                              <input type="text" name="lastName" className="form-control" value={userData.lastName} onChange={onChange} />
                            </div>
                            {!changePasswordVisible && (
                              <div className="col-md-6">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control bg-light" value={userData.password} disabled />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-link float-end p-0 text-decoration-none"
                                  onClick={() => setChangePasswordVisible(!changePasswordVisible)}
                                >
                                  Change password
                                </button>
                              </div>
                            )}
                            {changePasswordVisible && (
                              <>
                                <div className="col-md-6">
                                  <label className="form-label">Current Password</label>
                                  <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={passwords.password}
                                    onChange={onPasswordChange}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">New Password</label>
                                  <input
                                    type="password"
                                    name="newPassword"
                                    className="form-control"
                                    value={passwords.newPassword}
                                    onChange={onPasswordChange}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Confirm Password</label>
                                  <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={passwords.confirmPassword}
                                    onChange={onPasswordChange}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-link float-end p-0 text-decoration-none"
                                    onClick={() => {
                                      setChangePasswordVisible(!changePasswordVisible);
                                      dispatch(changeUserPassword(passwords));
                                    }}
                                  >
                                    Change password
                                  </button>
                                </div>
                              </>
                            )}
                            <div className="col-md-12 mt-0">
                              <label className="form-label">Phone Number</label>
                              <div className="input-group">
                                <div>
                                  <select className="form-select rounded-0 rounded-start bg-light" onChange={onChange} name="phCode">
                                    <option>+91</option>
                                    <option>+92</option>
                                  </select>
                                </div>
                                <input type="tel" className="form-control" name="phoneNumber" value={userData.phoneNumber} onChange={onChange} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <label className="form-label">Email Address</label>
                              <input type="email" className="form-control" name="emailAddress" value={userData.emailAddress} onChange={onChange} />
                            </div>
                            {/* <div className="col-md-12">
                         <div className="form-check form-check-inline">
                           <input className="form-check-input" type="radio" />
                           <label className="form-check-label">Male</label>
                         </div>
                         <div className="form-check form-check-inline">
                           <input className="form-check-input" type="radio" />
                           <label className="form-check-label">Female</label>
                         </div>
                       </div> */}

                            <div className="col-md-12 mt-4">
                              <button className="btn btn-primary float-end">Update</button>
                            </div>
                          </form>
                        </div>
                      </div>

                      {currentUser.shippingInfo && (
                        <div className="card border-0 shadow">
                          <div className="p-3 d-flex border-bottom">
                            <h5 className="my-auto fw-semibold">Addresses</h5>
                          </div>
                          <div className="card-body">
                            <div className="row row-cols-1 row-cols-lg-2 g-3">
                              <div className="col">
                                <AddressView />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-lg-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        )}
      </>
    </PageLayout>
  );
};

export default Profile;
