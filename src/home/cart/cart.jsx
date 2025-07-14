
import { useDispatch } from "react-redux"
import { userCart } from "../../slices/cart"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import CartList from "./cartlist"
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

    // const handleDelete = (cartId) => {
    // // optional: send DELETE request here
    //     setCartItems((prev) => prev.filter((item) => item.cart_id !== cartId));
    // };
    return(
        <>
            <CartList cartItems={cart}  />
        </>
    )
}