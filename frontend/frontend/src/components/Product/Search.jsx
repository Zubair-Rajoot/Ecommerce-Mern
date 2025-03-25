import React, { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';
import './Search.css'
import MetaData from '../layout/MetaData';

const Search = ({history}) => {

    const[keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e)=>{
        e.preventDefault();

        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate(`/products`)
        }
    }

  return (
   <>

<MetaData title="Search products "/>
   <form className="searchBox" onSubmit={searchSubmitHandler}>

        <input type='text'
        placeholder='Search a Product...'
        onChange={(e)=>setKeyword(e.target.value)}
        />

        <input type='submit' value="search"/>
   </form>
   

   </>
  )
}

export default Search
