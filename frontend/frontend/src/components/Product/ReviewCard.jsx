import { Rating } from "react-simple-star-rating";
import React from "react";
import profilePng from "../../assets/Profile.png";

const ReviewCard = ({ review }) => {
  

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
     <Rating initialValue={review.rating?.rate || 0} readonly allowFraction size={19} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;