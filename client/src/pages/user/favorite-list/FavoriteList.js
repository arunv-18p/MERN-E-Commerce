import PageLayout from "../../../components/page-layout/PageLayout";
import AccountMenu from "../../../components/user/account-menu/AccountMenu";
import FavoriteProduct from "../../../components/user/favourite-product/FavouriteProduct";

import { Link } from "react-router-dom";

function FavoriteList() {
  return (
    <PageLayout>
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
                  My Favorites
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-fluid p-4">
        <div className="row g-3">
          <div className="col-lg-3">
            <AccountMenu current="favorite-list" />
          </div>
          <div className="col-lg-9">
            <div className="row row-cols-1 row-cols-md-2 g-3">
              <div className="col">
                <FavoriteProduct />
              </div>
              <div className="col">
                <FavoriteProduct />
              </div>
              <div className="col">
                <FavoriteProduct />
              </div>
              <div className="col">
                <FavoriteProduct />
              </div>
              <div className="col">
                <FavoriteProduct />
              </div>
            </div>
            <nav className="float-end mt-3">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Prev
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
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
            </nav>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
    </PageLayout>
  );
}

export default FavoriteList;
