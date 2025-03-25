import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const productCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>

      <div>
        <Rating initialValue={product.rating?.rate || 0} readonly allowFraction size={19} />
        <span>({product.numOfReviews || 0} reviews)</span>
      </div>

      <span>{`Rs. ${product.price}`} </span>
    </Link>
  );
};

export default productCard;
