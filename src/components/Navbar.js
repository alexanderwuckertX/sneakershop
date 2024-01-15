import React, { useState, useEffect, useRef } from 'react';
import './Navbar.scss';
import '../_globals.scss';
import SideNav from './SideNav';

const Navbar = ({ cartItems, setCartItems}) => {
    const [ cartboxOpen, setCartboxOpen ] = useState(false);
    const [ cartboxHeight, setCartboxHeight ] = useState(256); 
    const [ cartIconPosition, setCartIconPosition ] = useState({top: 0, right: 0});
    const [ totalItemsInCart, setTotalItemsInCart ] = useState(0);
    const [ cartItemCount, setCartItemCount ] = useState(0);
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ sideNavOpen, setSideNavOpen ] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
      console.log(`Is menu open? ${!menuOpen}`); 
    }

    const toggleSideNav = () => {
      setSideNavOpen(!sideNavOpen);
      
    };

    const avatarRef = useRef(null);
    const toggleCart = (e) => {
        e.preventDefault();
        setCartboxOpen(!cartboxOpen);
    }

    const toggleAvatarBorder = () => {
      if(avatarRef.current) {
        avatarRef.current.classList.toggle('selected');
      }
    }

    const calculateMaxHeight = () => {
        const minHeight = 120; // Minimum height
        const spacing = 10; // Small spacing at the bottom
        const maxHeight = Math.min(
          minHeight + cartItems.length * 180 + spacing,
          window.innerHeight - spacing
        );
        return maxHeight;
      };
      
      const updateCartIconPosition = () => {
        const cartIcon = document.querySelector('.navbar-icon-cart');
        if(cartIcon) {
          const rect = cartIcon.getBoundingClientRect();
          setCartIconPosition({top: rect.bottom + 10, left: rect.left });
        }
      }

    const updateCartboxHeight = () => {
        const maxCartboxHeight = calculateMaxHeight();

        setCartboxHeight(maxCartboxHeight);
    }

    useEffect (() => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
      if(storedCartItems) {
        setCartItems(storedCartItems);
      }
      
      const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
      setTotalItemsInCart(totalItems);

        updateCartboxHeight();
        updateCartIconPosition();
        const handleResize = () => updateCartIconPosition();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [cartItems, setCartItems]);

    const saveCartItemsToLocalStorage = (items) => {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }

    const handleDeleteItem = (index) => {
        const updatedCartboxItems = [...cartItems];
        updatedCartboxItems.splice(index, 1);
        setCartItems(updatedCartboxItems);
        saveCartItemsToLocalStorage(updatedCartboxItems);
        setCartItemCount(cartItemCount - 1);
    };

    const renderCartContent = () => {
        if (cartItems.length === 0) {
          return <p>Your cart is empty.</p>
        } else {
          return (
            <div>
              <ul className="cart-items">
                {cartItems.map((item, index) => (
                  <li key={index} className="cart-item">
                    <div className="cart-item-thumbnail">
                      <img src={item.thumbnailUrl} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                      <p className="cart-item-price">${item.price}</p>
                      
                    </div>
                    <div className="cart-item-delete">
                        <img src="./images/icon-delete.svg" onClick={handleDeleteItem} />
                    </div>
                  </li>
                ))}
              
              </ul>
              {cartItems.length > 0 && (
                <button className="checkout-btn">Checkout</button>
              )}
            </div>
          )
        }
      }
      
    return (
        <div className="navbar-container">
            <nav className="navbar">
              <button className="menu-button" onClick={toggleSideNav}>
                  <img src="./images/icon-menu.svg" alt="menu" />
              </button>
             <a href="">
                <img src="./images/logo.svg" className="sneakerlogo" alt="logo" />
             </a>
            {/*
              <a href="#" onClick={toggleMenu} className={`${menuOpen ? 'mobile-menu-icon open' : 'mobile-menu-icon'}`}>
                <img src="./images/icon-menu.svg"></img>
              </a>
              
              <a href=""><img src="./images/logo.svg" className="sneakerlogo" alt="logo"></img></a>

    */}  {/* 
                <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                    <li ><a href="#">Collections</a></li>
                    <li><a href="#">Men</a></li>
                    <li><a href="#">Women</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>

              */}

      <ul className="navbar-links">
                <li>
                  <a href="#">Collections</a>
                </li>
                <li>
                  <a href="#">Men</a>
                </li>
                <li>
                  <a href="#">Women</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
                <div className="navbar-icons">
                    <a href="#"><img src="./images/icon-cart.svg" alt="cart" className="navbar-icon-cart" onClick={toggleCart}></img></a>
                    {totalItemsInCart > 0 && (
                      <div className="cart-item-counter">{totalItemsInCart}</div>
                    )}

                    {cartboxOpen && (
                        <div className="cartbox-modal open" 
                        style={{ 
                          top: cartIconPosition.top + 'px',
                          left: cartIconPosition.left + 'px',
                          minHeight: '256px',
                          height: cartboxHeight + 'px',
                          }}>
                            {/* The cartbox content */ }
                            <div className="cartbox-content">
                                <p>Cart</p>
                                <div className="rectangle" />
                                {renderCartContent()}
                               
                            </div>
                        </div>
                    ) }
                    <a href="#"><img src="./images/image-avatar.png" alt="avatar" className="navbar-icon-avatar" ref={avatarRef} onClick={toggleAvatarBorder}></img></a>
                </div>
            </nav>
            <div className="rectangle"></div>

            <SideNav isOpen={sideNavOpen} onClose={toggleSideNav}></SideNav>
            {sideNavOpen && (
              <div className="dark-lightbox"></div>
            )}

              

           
        </div>
    )
}

export default Navbar;