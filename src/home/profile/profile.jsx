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

import { useDispatch  } from "react-redux";
import { logoutUser, profileuser } from "../../slices/user";


export  function Profil(){
    const {user}= useParams()
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(profileuser({user})).then((res) => {
        setUserData(res.payload); // most likely it's in payload
        console.log(res)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load user profile", err);
        setLoading(false)
    })}, [user,dispatch] )
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handlelogout = () => {
      dispatch(logoutUser())
      navigate("/")
      setOpen(false);
    };

    const handleClose = ()=>{
      setOpen(false);
    }

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
                <Button variant="contained" color="error" onClick={handleClickOpen}>
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
                  <Button onClick={handlelogout} color="error" autoFocus>
                    Yes, log me out
                  </Button>
                </DialogActions>
              </Dialog>
        </>
    )
}