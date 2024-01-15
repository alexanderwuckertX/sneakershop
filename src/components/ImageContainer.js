import React, { useState, useEffect, useRef } from 'react';
import "./ImageContainer.scss";

const ImageContainer = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);
  const [showArrows, setShowArrows] = useState(false);
  const [arrowPositions, setArrowPositions] = useState({
    left: 0,
    right: 0,
  });

  const mainImages = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
  ];

  const thumbnails = [
    "./images/image-product-1-thumbnail.jpg",
    "./images/image-product-2-thumbnail.jpg",
    "./images/image-product-3-thumbnail.jpg",
    "./images/image-product-4-thumbnail.jpg",
  ];

  const updateArrowPositions = () => {
    const container = containerRef.current;
    const image = container.querySelector(".heroImg");
    const leftArrow = container.querySelector(".left-arrow");
    const rightArrow = container.querySelector(".right-arrow");
  
    if (container && image && leftArrow && rightArrow) {
      const containerWidth = container.clientWidth;
      const imageWidth = image.clientWidth;
      const leftPosition = (containerWidth - imageWidth) / 2;
  
      leftArrow.style.left = `${leftPosition}px`; // Set the left arrow position
      rightArrow.style.right = `${leftPosition}px`; // Set the right arrow position
    }
  };

  const handleThumbnailClick = (index) => {
    console.log(`Opening lightbox with image index: ${index}`);
    setActiveImageIndex(index);
    setLightboxOpen(true);
    setSelectedThumbnailIndex(index);
  };

  const openLightbox = (index) => {
    setLightboxImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const navigateImages = (direction) => {
    if (!lightboxOpen) {
      const changeIndex = direction === 'next' ? 1 : -1;
      const newIndex = (activeImageIndex + changeIndex + mainImages.length) % mainImages.length;
      setActiveImageIndex(newIndex);
    } else {
      if (direction === 'next' && lightboxImageIndex < mainImages.length - 1) {
        setLightboxImageIndex(lightboxImageIndex + 1);
      } else if (direction === 'previous' && lightboxImageIndex > 0) {
        setLightboxImageIndex(lightboxImageIndex - 1);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      navigateImages('next');
    } else if (event.key === 'ArrowLeft') {
      navigateImages('previous');
    }
  };

  useEffect(() => {
    updateArrowPositions();
    const handleResize = () => {
        updateArrowPositions();
    }

    window.addEventListener("resize", updateArrowPositions);

    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setShowArrows(false); // Hide arrows on smaller screens
    } else {
      setShowArrows(true); // Show arrows on larger screens
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener("resize", updateArrowPositions);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeImageIndex, lightboxImageIndex, lightboxOpen, mainImages.length]);

  const containerRef = useRef(null);

  return (
    <div className="sneakerimg" ref={containerRef}>
      {lightboxOpen && (
        <div className="lightbox">
          <span className="close" onClick={closeLightbox}>&times;</span>
          {lightboxImageIndex > 0 && (
            <img
              src="./images/icon-previous.svg"
              className={`lightbox-arrow left-arrow ${showArrows ? 'show-arrows' : ''}`}
              alt="Previous"
              onClick={(event) => {
                navigateImages('previous');
              }}
              style={{ left: lightboxOpen ? '10px' : arrowPositions.left }} // Apply left position
            />
          )}
          <img className="lightbox-img" src={mainImages[lightboxImageIndex]} alt="Enlarged product"></img>
          {lightboxImageIndex < mainImages.length - 1 && (
            <img
              src="./images/icon-next.svg"
              className="lightbox-arrow right-arrow"
              alt="Next"
              onClick={(event) => {
                navigateImages('next');
              }}
              style={{ right: lightboxOpen ? '10px' : arrowPositions.right }} // Apply right position
            />
          )}
        </div>
      )}
      <img className="heroImg" src={mainImages[activeImageIndex]} alt="Product" onClick={() => openLightbox(activeImageIndex)}></img>
      <ul className="thumbnails">
        {thumbnails.map((thumbnail, index) => (
          <li
            key={index}
            className={index === selectedThumbnailIndex ? "selected" : ""}
          >
            <img src={thumbnail} alt={`Thumbnail ${index + 1}`} onClick={() => handleThumbnailClick(index)}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageContainer;
