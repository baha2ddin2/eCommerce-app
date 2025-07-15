import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { productItem, review } from "../../slices/product"
import FullPageProductView from "./itemUI"
import ReviewList from "./reviews"

export default function Item(){
    const dispatch = useDispatch()
    const {id}=useParams()
    const itemData = useSelector(state=>state.product.dataItem)
    let reviews = useSelector(state=>state.product.dataReview)
    console.log(itemData)
    console.log(reviews)
    const error = useSelector(state => state.product.errorItem || state.product.errorReview)
    useEffect(()=>{
        console.log("hi")
        dispatch(productItem({id}))
        dispatch(review({id}))

    },[dispatch,id])
    console.log(itemData)
    console.log(reviews)
    if (!Array.isArray(reviews)) {
       reviews = [reviews];
    }
    if (error) return <h1>{error}</h1>
    return(
        <>
            <FullPageProductView item={itemData} />
            <ReviewList  reviews={reviews}/>
        </>
    )
}