import React, { useState } from "react";
import { FaBars, FaUser, FaSearch, FaShoppingCart, FaChevronUp } from "react-icons/fa";
import "./Header.css"; // Import CSS

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Button (Only visible when navbar is closed) */}
      {!isOpen && (
        <div className="menu-bar">
          <FaBars className="menu-icon" onClick={() => setIsOpen(true)} />
        </div>
      )}

      {/* Full Navbar (Slides Down When Open) */}
      <header className={`navbar ${isOpen ? "open" : ""}`}>
        <div className="header-content">
          {/* Logo */}
          <div className="left-section">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPE9VD7hC5m5iUcMPpHnJWJj37QdoVWgzLsg&s" alt="Logo" className="logo" />
          </div>

          {/* Navigation Links (Now in Single Line) */}
          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/contact">Contact</a>
            <a href="/about">About</a>
          </nav>

          {/* Right Icons */}
          <div className="right-icons">
            <a href="/account">
              <FaUser className="icon" />
            </a>
           <a href="/search">
           <FaSearch className="icon" />
           </a>
            <FaShoppingCart className="icon" />
          </div>
        </div>

        {/* Greater Than Icon (Below Content - Click to Close Navbar) */}
        <FaChevronUp className="down-icon" onClick={() => setIsOpen(false)} />
      </header>
    </>
  );
};

export default Header;
