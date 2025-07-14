
import { useDispatch } from "react-redux"
import { userCart } from "../../slices/cart"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import CartList from "./cartlist"
import CartSkeleton from "./cartSkeleton"
export default function Cart (){
    const {user} = useParams()
    const dispatch = useDispatch()
    // const cartData = useSelector((state)=>state.cart.cart)
    const [cart,setCart]=useState([])
    useEffect(()=>{
        dispatch(userCart({user}))
        .unwrap()
        .then((data) => {
            setCart(data.data);
        })
        .catch((error) => {
        console.error("Error loading cart:", error);
        })
    },[user,dispatch])

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
  if (cart === null) {
    return <CartSkeleton />;
  }

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