import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { searchQuery } from '../Redux/Action';

const Navbar = () => {

    const [query, setQuery] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchQuery(query))
        // navigate("/search");
    }


    return (
        <>
        <div className='nav'>
            <div>
                <p className='text'>Safety Department</p>
            </div>
            <div className='right'>
            <div className='search' >
                <input type="text" placeholder='Search here...' onChange={(e)=>setQuery(e.target.value)}/>
            </div>
            <p className='search1' onClick={handleSearch}>Search</p></div>
        </div>
        
        </>
    )
}

export default Navbar
