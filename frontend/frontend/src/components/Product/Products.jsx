import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { fetchProducts } from '../../redux/slices/productSlice';
import ProductCard from '../Home/ProductCard';
import './Products.css'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';


import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

// import MetaData from "../layout/MetaData";


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Electronics"
];



const Products = (props) => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    const { keyword } = useParams();



    const setCurrentPageNo = (e) => {
        const pageNumber = Number(e);
        if (!isNaN(pageNumber)) {

            setCurrentPage(pageNumber);
        } else {
            console.error("Invalid Page Number:", e);
        }
    };




    // useEffect(() => {
    //     dispatch(fetchProducts(keyword, currentPage));
    // }, [dispatch, keyword, currentPage]);

    useEffect(() => {

        dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }))
    }, [dispatch, keyword, currentPage, price, category, ratings]);






    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };


    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <>
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>



                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />


                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>


                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>




                    </div>







                    {productsCount > 8 && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}

                </>
            )}
        </>
    );
};

export default Products;
