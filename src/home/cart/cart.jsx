
import { useDispatch ,useSelector } from "react-redux"
import { userCart } from "../../slices/cart"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import CartList from "./cartlist"
import CartSkeleton from "./cartSkeleton"
export default function Cart (){
    const {user} = useParams()
    const dispatch = useDispatch()
    const landing = useSelector((state)=>state.cart.loading)
    const cartdata = useSelector((state)=>state.cart.cart)
    const error = useSelector((state)=>state.cart.error)

    const [cart,setCart]=useState([])
    useEffect(()=>{
        dispatch(userCart({user}))
        setCart(cartdata)
    },[user,dispatch,cartdata])

    const handleDelete = (id) => {
    setCart(cart.filter((item) => item.cart_id !== id));
  };

  const handleIncrease = (id) => {
    setCart(
      cart.map((item) => {
        if (item.cart_id === id) {
          const newQty = item.quantity + 1;
          return {
            ...item,
            quantity: newQty,
            total_line_price: (newQty * parseFloat(item.price)).toFixed(2)
          };
        }
        return item;
      })
    );
  };

  const handleDecrease = (id) => {
    setCart(
      cart.map((item) => {
        if (item.cart_id === id && item.quantity > 1) {
          const newQty = item.quantity - 1;
          return {
            ...item,
            quantity: newQty,
            total_line_price: (newQty * parseFloat(item.price)).toFixed(2)
          };
        }
        return item;
      })
    );
  };
  if (landing) return <CartSkeleton />
  if (error) return error

    return(
        <>
            <CartList
                cartItems={cart}
                onDelete={handleDelete}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
            />
        </>
    )
}