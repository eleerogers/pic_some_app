import React, {useContext} from "react";
import PropTypes from "prop-types";
import useHover from "../hooks/useHover";
import {Context} from "../Context";

function CartItem({item}) {
  const [hovered, ref] = useHover();
  const {removeFromCart} = useContext(Context);
  const delBtnClassName = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line";
  
  return (
    <div className="cart-item">
      <i ref={ref} onClick={() => removeFromCart(item)} className={delBtnClassName}></i>
      <img src={item.url} width="130px" alt="" />
      <p>$5.99</p>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string.isRequired
  })
}

export default CartItem;
