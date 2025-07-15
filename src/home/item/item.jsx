import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { productItem } from "../../slices/product"
import FullPageProductView from "./itemUI"

export default function Item(){
    const dispatch = useDispatch()
    const {id}=useParams()
    const itemData = useSelector(state=>state.product.dataItem)
    const error = useSelector(state => state.product.errorItem)
    useEffect(()=>{
        dispatch(productItem({id}))

    },[dispatch,id])
    console.log(itemData)
    if (error) return <h1>{error}</h1>
    return(
        <>
            <FullPageProductView item={itemData} />
        </>
    )
}