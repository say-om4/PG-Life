import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import ScrollToBottom from "./components/ScrollToBottom/ScrollToBottom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import PGListing from "./pages/PGListing/PGListing";
import PGDetails from "./pages/PGDetails/PGDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import AddPG from "./pages/Admin/AddPG";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditPG from "./pages/Admin/EditPG";
import Profile from "./pages/Profile/Profile";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Privacy/Privacy";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pgs" element={<PGListing />} />
        <Route path="/pg-details/:id" element={<PGDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin/add-pg" element={<AddPG />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<EditPG />} />
      </Routes>
      <ScrollToBottom />
    </BrowserRouter>
  );
}

export default App;