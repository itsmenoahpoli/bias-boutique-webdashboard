import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Error404 from "./pages/Error404";
import SignIn from "./pages/AuthPages/SignIn";
import AppLayout from "./layout/AppLayout";
import Overview from "./pages/dashboard/Overview";
import Products from "./pages/dashboard/Products";
import Vouchers from "./pages/dashboard/Vouchers";
import Orders from "./pages/dashboard/Orders";
import Payments from "./pages/dashboard/Payments";
import Customers from "./pages/dashboard/Customers";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <ToastContainer
          position="top-center"
          theme="colored"
          style={{ zIndex: 999999 }} // Using the highest z-index from your variables
        />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/products" element={<Products />} />
            <Route path="/vouchers" element={<Vouchers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/customers" element={<Customers />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
}
