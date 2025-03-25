import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ keyword: "", currentPage: 1 }));
  }, [dispatch]);
  

  return (
    <>
    <MetaData title="All Products Ecommerce"/>
      <div className="bannner">
        <p>Welcome To Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Move To Product <CgMouse />
          </button>
        </a>
      </div>


      <h2 className="homeHeading" id="homeHeading">
        Featured Products
      </h2>

      {loading && <Loader/>}
      {error && <h3>Error: {error}</h3>}

      <div className="container" id="container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
