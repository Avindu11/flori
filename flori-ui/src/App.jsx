import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Index from "./views/Index";
import Auth from "./views/Auth";
import Shop from "./views/Shop";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Profile from "./views/customer/Profile";
import Dashboard from "./views/seller/Dashboard";
import AdminDashboard from "./views/admin/AdminDashboard";
import PointOfSale from "./views/seller/PointOfSale";
import ConfirmOrder from "./views/seller/ConfirmOrder";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/seller/dashboard" element={<Dashboard />} />
          <Route path="/seller/point-of-sale" element={<PointOfSale />} />
          <Route path="/seller/point-of-sale/confirm" element={<ConfirmOrder />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
