import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ImageContainer from './components/ImageContainer';
import SneakerInformation from './components/SneakerInformation';
import './_globals.scss';
import styled from 'styled-components';


const StyledMainSectionContainer = styled.div`
display: flex;
flex-direction: column; /* Initially, components are stacked vertically */
margin-top: 90px;

@media (max-width: 768px) {
  margin-top: 0;
}

@media (min-width: 769px) {
  flex-direction: row; /* On larger screens, components are displayed side by side */
  justify-content: center;
  align-items: flex-start;
  gap: 120px;


}
`
function App() {
  const [ cartItems, setCartItems ] = useState([]);

  const addItemToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
  }

  return (
    <>
      <Navbar cartItems={cartItems} setCartItems={setCartItems} />
      <StyledMainSectionContainer>
        <ImageContainer />
        <SneakerInformation addItemToCart={addItemToCart} setCartItems={setCartItems} />
      </StyledMainSectionContainer>
    <div className="contribution">

    </div>
   </>
  );
}

export default App;
