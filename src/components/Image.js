import React, {useState, useContext} from "react";
import {Context} from "../Context";
import PropTypes from "prop-types"

function Image({className, img}) {
  const [hovered, setHovered] = useState(false);
  const {toggleFavorited, addToCart, removeFromCart, cartItems} = useContext(Context);

  const heartIcon = img.isFavorite
    ? <i onClick={() => toggleFavorited(img.id)} className="ri-heart-fill favorite"></i>
    : <i onClick={() => toggleFavorited(img.id)} className="ri-heart-line favorite"></i>
  
  const heartDisplay = (hovered || img.isFavorite) && heartIcon; 

  function cartDisplay() {
    const inCart = cartItems.some(image => image.id === img.id)
    if (inCart) {
      return <i onClick={() => removeFromCart(img)} className="ri-shopping-cart-fill cart"></i>
    } else if (hovered) {
      return <i onClick={() => addToCart(img)} className="ri-add-circle-line cart"></i>
    }
  }

  return (
      <div 
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)} 
        className={`${className} image-container`}
      >
        {heartDisplay}
        {cartDisplay()}
        <img key={img.id} src={img.url} alt={img.id} className="image-grid"/>
      </div>
  )
}

Image.propTypes = {
  className: PropTypes.string,
  img: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  })
}

export default Image;