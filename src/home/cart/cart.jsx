
import { useDispatch ,useSelector } from "react-redux"
import { userCart } from "../../slices/cart"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import CartList from "./cartlist"
import CartSkeleton from "./cartSkeleton"
import { newQuantity } from "../../slices/cart"
export default function Cart (){
    const {user} = useParams()
    const dispatch = useDispatch()
    const landing = useSelector((state)=>state.cart.loading)
    const cartdata = useSelector((state)=>state.cart.cart)
    const error = useSelector((state)=>state.cart.error)

    useEffect(()=>{
        dispatch(userCart({user}))
    },[user,dispatch])

    const handleDelete = (id) => {
    cartdata.filter((item) => item.cart_id !== id)
  };

  const handleIncrease =  (id) => {
  const item = cartdata.find((item) => item.cart_id === id);
  if (item ) {
    const newQty = item.quantity + 1;
    dispatch(newQuantity({ id, quantity: newQty }));
  };

  }

  const handleDecrease =  (id) => {
  const item = cartdata.find((item) => item.cart_id === id);
  if (item && item.quantity > 1) {
    const newQty = item.quantity - 1;
    dispatch(newQuantity({ id, quantity: newQty }));

  }
}
  if (landing) return <CartSkeleton />
  if (error) return error

    return(
        <>
            <CartList
                cartItems={cartdata}
                onDelete={handleDelete}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
            />
        </>
    )
}