import axios from "axios"
import { useEffect, useState } from "react"
import { useParams , useNavigate } from "react-router-dom"

import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export  function Profil(){
    const {user}= useParams()
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`http://localhost:3001/api/users/${user}`)
        .then((response)=>{
            setUserData(response.data)
            setLoading(false)
            console.log(response)
        }).catch((error) => {
            console.error("Axios error:", error);
            setLoading(false)
        });

    }, [user] )
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      localStorage.clear()
      navigate("/")
    };

    if (!user) return <Typography variant="h6" color="error">User not found</Typography>;
    if (loading) return <CircularProgress style={{ margin: 100 }} />;
    return(
        <>
            <Card style={{ maxWidth: 500, margin: '50px auto', padding: 20 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>User Profile</Typography>
                    <Typography><strong>USER:</strong> {user}</Typography>
                    <Typography><strong>NAME:</strong> {userData.name}</Typography>
                    <Typography><strong>EMAIL:</strong> {userData.email}</Typography>
                    <Typography><strong>PHONE:</strong> {userData.phone}</Typography>
                    <Typography><strong>JOINED :</strong> {new Date(userData.created_at).toLocaleDateString()}</Typography>
                </CardContent>
                <Button variant="outlined" color="error" onClick={handleClickOpen}>
                  logout
                </Button>
            </Card>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  Are you sure you want to log out?
                </DialogTitle>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleClose} color="error" autoFocus>
                    Yes, log me out
                  </Button>
                </DialogActions>
              </Dialog>
        </>
    )
}