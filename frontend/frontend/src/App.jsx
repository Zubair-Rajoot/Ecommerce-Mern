import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import "./App.css";
import ProductDetails from "./components/Product/ProductDetail";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./redux/store";
import { loadUser } from "./redux/slices/userSlice";
import { useEffect } from "react";
import UserOptions from "./components/layout/Header/UserOptions.jsx";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from './components/User/UpdateProfile'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />

        {/* ✅ Wrap Profile page inside ProtectedRoute */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/account" element={<Profile />} />
        {/* </Route> */}

        <Route path="/me/update" element={<UpdateProfile />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
