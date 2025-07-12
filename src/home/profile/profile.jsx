import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Card, CardContent, Typography, CircularProgress } from '@mui/material';


export default function Profil(){
    const {userParam}= useParams()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get(`http://localhost:3001/api/users/${userParam}`)
        .then((response)=>{
            setUser(response)
            setLoading(false)
            console.log(response)
        }).catch((error) => {
            console.error("Axios error:", error);
            setLoading(false)
        });

    }, [userParam] )

    if (!user) return <Typography variant="h6" color="error">User not found</Typography>;
    if (loading) return <CircularProgress style={{ margin: 100 }} />;
    return(
        <>
            <Card style={{ maxWidth: 500, margin: '50px auto', padding: 20 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>User Profile</Typography>
                    <Typography><strong>Name:</strong> {user}</Typography>
                    <Typography><strong>Email:</strong> {user}</Typography>
                    <Typography><strong>Joined:</strong> {new Date(user).toLocaleDateString()}</Typography>
                </CardContent>
            </Card>
        </>
    )
}