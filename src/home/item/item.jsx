import { useEffect , useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { productItem, review } from "../../slices/product"
import FullPageProductView from "./itemUI"
import ReviewList from "./reviews"
import Alert from '@mui/material/Alert';
import AddReviewForm from "./AddReviewForm"
import { addcart } from "../../slices/cart"
import CryptoJS from "crypto-js";

export default function Item(){
    const dispatch = useDispatch()
    const {id}=useParams()
    const itemData = useSelector(state=>state.product.dataItem)
    let reviews = useSelector(state=>state.product.dataReview)
    console.log(itemData)
    console.log(reviews)
    const error = useSelector(state => state.product.errorItem || state.product.errorReview)
    useEffect(()=>{
        dispatch(productItem({id}))
        dispatch(review({id}))
    },[dispatch,id])

    const [visibleAlert,setVisibleAlert]=useState(false)
    const [errorAlert, setErrorAlert] = useState(false);
    if (!Array.isArray(reviews)) {
       reviews = [reviews];
    }
    if (error) return <h1>{error}</h1>

    const refreshReviews = () => {
        dispatch(review({ id }));
    };

    const handeladd = async (id , quantity)=>{
        const encrypted = localStorage.getItem("username");
        let decryptedName = null;

        if (encrypted) {
            const bytes = CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_SECRET_KEY);
            decryptedName = bytes.toString(CryptoJS.enc.Utf8);
        }
        if (!decryptedName) {
            return alert(" No user found. Please log in again.");
        }
        dispatch(addcart({
            productid: id,
            quantity: quantity,
            user: decryptedName
        })).unwrap()
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

    return(
        <>
            <FullPageProductView item={itemData} addcart={handeladd} />
            <ReviewList  reviews={reviews}/>
            <AddReviewForm productId={id} onSuccess={refreshReviews} />
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
                              you add this items to your cart successfully
                            </Alert>
                          )
                        }
            {errorAlert && (
                          <Alert
                            severity="error"
                            sx={{
                              position: 'fixed',
                              bottom: 60,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: 'fit-content',
                              fontSize: '0.8rem',
                              zIndex: 1300,
                            }}
                          >
                            Failed to add the item. check if is already in your cart
                          </Alert>
             )}
        </>
    )
}