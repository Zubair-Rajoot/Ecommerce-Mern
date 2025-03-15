import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const Product = ({ product }) => {
  const [rating, setRating] = useState(product.ratings || 0); 

  // const handleRating = (rate) => {
  //   setRating(rate);
  //   console.log("New Rating:", rate);
  
  // };

  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>

      <div>
      
        <Rating
          // onClick={handleRating}
          initialValue={rating} 
          readonly
          allowFraction 
          size={19} 
        />
        <span>(256 reviews)</span>
      </div>

      <span>{product.price} PKR</span>
    </Link>
  );
};

export default Product;
