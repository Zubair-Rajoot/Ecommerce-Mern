import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import './ProductDetail.css';
import { fetchProductDetails } from '../../redux/slices/productSlice';
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import ReviewCard from './ReviewCard'
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    


    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        if (id) dispatch(fetchProductDetails(id));
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product || Object.keys(product).length === 0) return <p>No product details available.</p>;

    console.log("Product Data:", product);

    return (
        <>
            {loading ? (<Loader />) :

                (
                    <>
                   
                    <MetaData title={`${product.name}`}/>
                        <div className="ProductDetails">
                            <div style={{ width: "100%", maxWidth: "600px", height: "400px", margin: "auto" }}>
                                <Carousel className="carousel-container">
                                    {product?.images?.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`Slide ${i}`}
                                        />
                                    ))}
                                </Carousel>
                            </div>





                            <div>
                                <div className="detailsBlock-1">
                                    <h2>{product.name}</h2>
                                    <p>Product # {product._id}</p>
                                </div>

                                <div className="detailsBlock-2">
                                    <Rating initialValue={product.rating?.rate || 0} readonly allowFraction size={19} />
                                    <span>({product.numOfReviews || 0} reviews)</span>
                                </div>


                                <div className="detailsBlock-3">
                                    <h1>{`Rs. ${product.price}`}</h1>
                                    <div className="detailsBlock-3-1 ">
                                        <div className="detailsBlock-3-1-1">
                                            <button>-</button>
                                            <input value="1" type='number' />
                                            <button>+</button>
                                        </div>
                                        {" "}
                                        <button>Add to Cart</button>
                                    </div>

                                    <p>
                                        Status: {" "}
                                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                            {product.Stock < 1 ? "OutOfStock" : "InStock"}

                                        </b>
                                    </p>
                                </div>


                                <div className="detailsBlock-4">
                                    Description: <p>{product.description}</p>
                                </div>


                                <button className='submitReview'>Submit Review </button>
                            </div>
                        </div>

                        <h3 className="reviewsHeading"> REVIEWS</h3>

                        {product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                                {product.reviews &&
                                    product.reviews.map((review) => <ReviewCard review={review} />)}
                            </div>
                        ) : (
                            <p className="noReviews">No Reviews Yet</p>
                        )}


                    </>
                )

            }

        </>
    );
};

export default ProductDetail;
