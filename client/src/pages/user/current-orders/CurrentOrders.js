import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../../../components/page-layout/PageLayout";
import AccountMenu from "../../../components/user/account-menu/AccountMenu";
import CurrentOrderCard from "../../../components/user/current-order-card/CurrentOrderCard";

import { Link } from "react-router-dom";
import { getMyOrders, getOrderSlice } from "../../../features/orderSlice";

import Loader from "../../../components/loader/Loader";
import { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";

function CurrentOrders() {
  const dispatch = useDispatch();
  const { userSplitOrders, loading } = useSelector(getOrderSlice);
  const [page, setPage] = useState(0);
  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])
  return (
    <PageLayout>
      {loading || userSplitOrders.length === 0 ? <Loader /> : (
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
                    Order History
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="container-fluid p-4">
          <div className="row g-3">
            <div className="col-lg-3">
              <AccountMenu current="order-history" />
            </div>
            <div className="col-lg-9">
              {userSplitOrders[page].map((orderItem, key) => {
                  return <CurrentOrderCard orderItem={orderItem} key={key} />
              })}

              <nav className="float-end mt-3">
              <PaginationControl
                      page={page}
                      between={1}
                      total={userSplitOrders.length}
                      limit={1}
                      changePage={(page) => {
                        setPage(page);
                      }}
                      ellipsis={1}
                    />
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
}

export default CurrentOrders;
