import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [photosArr, setPhotosArr] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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
    fetchData()
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
    <Context.Provider value={{photosArr, toggleFavorited, addToCart, removeFromCart, cartItems}}>
      {props.children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }