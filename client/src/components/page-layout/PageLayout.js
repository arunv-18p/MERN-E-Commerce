import Footer from "../footer/Footer";
import Header from "../header/Header";
import ScrollToTopOnMount from "../../utils/ScrollToTopOnMount";

import "./PageLayout.scss";

const PageLayout = ({ children, page }) => {
  return (
    <>
      <ScrollToTopOnMount />
      <div className="d-flex flex-column h-100 page-layout">
        <Header />
        <div className="flex-shrink-0">
          <div style={{ marginTop: page === "auth" ? "50px" : "50px" }}>{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
