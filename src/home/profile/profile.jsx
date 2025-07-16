import { useEffect, useState } from "react"
import { useParams , useNavigate } from "react-router-dom"

import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useDispatch, useSelector  } from "react-redux";
import { logoutUser, profileuser , logout } from "../../slices/user";


export  function Profil(){
    const {user}= useParams()
    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const userData = useSelector((state)=>state.user.data)
    const errorRedux = useSelector((state)=>state.user.error)

    const dispatch = useDispatch()
    console.log(user)
    useEffect(()=>{
      if (user){
        console.log("user"+user)
        dispatch(profileuser({user}))
      }
    },[user,dispatch] )
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handlelogout = () => {
      dispatch(logoutUser())
      dispatch(logout())
      navigate("/")
      setOpen(false);
    };

    const handleClose = ()=>{
      setOpen(false);
    }
    if(errorRedux) return JSON.stringify(errorRedux)
    if (!user) return <Typography variant="h6" color="error">User not found</Typography>;
    if (!userData) return <CircularProgress style={{ margin: 100 }} />;
    console.log(userData)
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