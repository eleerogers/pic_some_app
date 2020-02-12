import React, {useContext, useState} from "react"
import {Context} from "../Context"
import CartItem from "../components/CartItem"

function Cart() {
    const [btnText, setBtnText] = useState("Place Order")
    const {cartItems, setCartItems} = useContext(Context)
    const cartItemElements = cartItems.map(item => (
        <CartItem key={item.id} item={item} />
    ))
    const totalCost = cartItems.length * 5.99;

    function placeOrder() {
      setBtnText("Ordering...");
      setTimeout(() => {
        setCartItems([]);
        console.log('order placed!');
        setBtnText("Place Order");
      }, 3000);
    }
    
    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: {totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
            <div className="order-button">
              {cartItems.length > 0
                ? <button onClick={placeOrder}>{btnText}</button>
                : <p>Your cart is currently empty</p>  
              }
              
            </div>
        </main>
    )
}

export default Cart