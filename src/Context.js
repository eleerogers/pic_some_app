import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [photosArr, setPhotosArr] = useState(JSON.parse(localStorage.getItem('photosArrLocalStorage')) || []);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItemsLocalStorage')) || []);

  useEffect(() => {
    localStorage.setItem('cartItemsLocalStorage', JSON.stringify(cartItems));
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('photosArrLocalStorage', JSON.stringify(photosArr));
  }, [photosArr])

  function addToCart(img) {
    setCartItems(cart => [...cart, img]);
  }

  function removeFromCart(img) {
    setCartItems(cart => {
      return cart.filter(item => {
        return item.id !== img.id
      })
    })
  }

  async function fetchData() {
    try {
      const res = await fetch('https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json')
      const photos = await res.json();
      setPhotosArr(photos);
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (photosArr.length === 0) {
      fetchData();
    }
  }, []);

  function toggleFavorited(id) {
    const updatedPhotosArr = photosArr.map(photo => {
      if (photo.id === id) {
        return {
          ...photo,
          isFavorite: !photo.isFavorite
        }
      } else {
        return photo
      }
    })
    setPhotosArr(updatedPhotosArr);
  }

  return (
    <Context.Provider
      value={{
        photosArr, 
        toggleFavorited, 
        addToCart, 
        removeFromCart, 
        cartItems, 
        setCartItems}}
    >
      {props.children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }