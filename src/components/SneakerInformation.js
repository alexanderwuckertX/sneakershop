import React, {useState, useEffect} from "react";
import './SneakerInformation.scss';

const SneakerInformation = ({setCartItems} ) => {
    const [counter, setCounter] = useState(1);
    const [price, setPrice] = useState(125);

    const increaseCounter = (e) => {
        e.preventDefault();
        setCounter(counter + 1);
    }
    
    const decreaseCounter = (e) => {
        e.preventDefault();
        if(counter > 1) {
            setCounter(counter - 1);
        }
    }

    const handleAddToCartClick = () => {
        const item = {
                name: "Limited Edition Sneaker",
                thumbnailUrl: "./images/image-product-1-thumbnail.jpg", // Use require() for relative paths
                price: price,
                quantity: counter,
            };
        //Get the current cart items
        const currentCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        //Add the new item to the cart
        const updatedCartItems = [...currentCartItems, item];
        
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        setCartItems(updatedCartItems);
            

        console.log("Item added to cart:", item);
    }

    useEffect (() => {
        setPrice(counter * 125);
    }, [counter]);

    return (
        <>
            <div className="sneaker-info">
                <p className="company-title">Sneaker Company</p>
                <p className="product-title">Fall Limited Edition Sneakers</p>
                <p className="description">
                    These low profile sneakers are your perfect casual wear companion.
                    Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.
                </p>
                <p className="new-price">$125 <span>50%</span></p>
                <p className="old-price">$250.00</p>
                <div className="add-to-cart-box">
                    <div className="counter-and-icon">
                        <button className="counter">
                            <a href="" onClick={decreaseCounter}><img src="./images/icon-minus.svg" alt="Minus" /></a>
                            <p>{counter}</p>
                            <a href=""  onClick={increaseCounter}><img src="./images/icon-plus.svg" alt="Plus" /></a>
                        </button>
                        <button className="addtocart" onClick={handleAddToCartClick}>
                            <img className="icon-cart" src="./images/icon-cart.svg" alt="Add to Cart" />
                            <a href="">Add to cart</a>
                        </button>
                    </div>
                </div>
                
            </div>
            
        </>
    )
}
export default SneakerInformation;
