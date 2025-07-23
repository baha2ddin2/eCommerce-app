
import { useDispatch ,useSelector } from "react-redux"
import { deleteCart, userCart } from "../../slices/cart"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Alert from '@mui/material/Alert';
import CartList from "../../components/cartlist"
import CartSkeleton from "../../components/cartSkeleton"
import { newQuantity } from "../../slices/cart"

export default function Cart (){
    const {user} = useParams()
    const dispatch = useDispatch()
    const landing = useSelector((state)=>state.cart.loading)
    const cartdata = useSelector((state)=>state.cart.cart)
    const error = useSelector((state)=>state.cart.error)
    const [visibleAlert,setVisibleAlert]=useState(false)
    const [errorAlert, setErrorAlert] = useState(false);
    useEffect(()=>{
        dispatch(userCart({user}))
    },[user,dispatch])
    const handleDelete = (id) => {
      dispatch(deleteCart({id , user}))
      .unwrap()
      .then(()=>{
        setVisibleAlert(true)
        setTimeout(()=>{
          setVisibleAlert(false)
        },3000)
      })
      .catch(()=>{
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 3000);
      })
      }


  const handleIncrease =  (id) => {
    const item = cartdata.find((item) => item.cart_id === id);
    if (item ) {
      const newQty = item.quantity + 1;
      dispatch(newQuantity({ id, quantity: newQty ,user }));
    };
  }
  const handleDecrease =  (id) => {
    const item = cartdata.find((item) => item.cart_id === id);
    if (item && item.quantity > 1) {
      const newQty = item.quantity - 1;
      dispatch(newQuantity({ id, quantity: newQty ,user }));
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
                user={user}
            />
            {visibleAlert &&(
                <Alert sx={{
                  position: 'fixed',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 'fit-content',
                  fontSize: '0.8rem',
                  zIndex: 1300,
                  }} severity="success">
                  you delete this items successfully
                </Alert>
              )
            }
            {errorAlert && (
              <Alert
                severity="error"
                sx={{
                  position: 'fixed',
                  bottom: 60, // slightly above the success alert
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 'fit-content',
                  fontSize: '0.8rem',
                  zIndex: 1300,
                }}
              >
                Failed to delete the item. Please try again.
              </Alert>
            )}
        </>
    )
}