// import { Helmet } from "react-helmet";
// import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {/* <main style={{ minHeight: "70vh" }}>{children}</main> */}
      <Outlet />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
