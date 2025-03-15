import React from 'react';
import { CgMouse } from "react-icons/cg";
import './Home.css';
import Product from './Product';

const product = {
  name: "Red Shirt",
  images: [{ url: 'https://italiano.pk/cdn/shop/files/0122253-MRN_1724f328-4d42-4c7b-9f74-e8c85ba48e06.jpg?v=1717236711' }],
  price: "3000",
  _id: "jujhjh",
  ratings: 4.5 // ⭐ Make sure ratings exist
};


const Home = () => {
  return (
    <>
      <div className="bannner">
        <p>Welcome To Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Move To Product <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading" id='homeHeading'>Featured Products</h2>
      
      <div className="container" id='container'>
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
