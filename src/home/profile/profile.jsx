import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function Profil(){
    const [res,setRes]=useState(null)
    const {user}= useParams()
    useEffect(()=>{
        axios(`http://localhost:3001/api/users/${user}`
            )
        .then((response)=>{
            setRes(response.data)
        }).catch((error) => {
            console.error("Axios error:", error);
            setRes({ error: error.message });
        });

    }, [user] )
    return(
        <>
            {JSON.stringify(res)}
        </>
    )
}