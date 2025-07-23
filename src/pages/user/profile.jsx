import { useEffect, useState } from "react"
import { useParams , useNavigate ,Link as LinkRoute } from "react-router-dom"

import { Card, CardContent, Typography, CircularProgress ,Box,IconButton ,Link } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useDispatch, useSelector  } from "react-redux";
import { logoutUser, profileuser , logout } from "../../slices/user";
import OrdersUI from "../../components/orders";
import { fullorder } from "../../slices/orders";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DashboardIcon from '@mui/icons-material/Dashboard';

export  function Profil(){
    const {user}= useParams()
    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const userData = useSelector((state)=>state.user.data)
    const errorRedux = useSelector((state)=>state.user.error)
    const orders = useSelector((state)=>state.order.orderUser)

    const dispatch = useDispatch()
    useEffect(()=>{
      if (user){
        dispatch(profileuser({user}))
        dispatch(fullorder({user}))
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
    return(
        <>
            <Card style={{ maxWidth: 500, margin: '50px auto', padding: 20 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" gutterBottom>User Profile</Typography>
                    <IconButton>
                      <Link component={LinkRoute} to={`/home/edit-profile/${user}`}>
                        <EditSquareIcon />
                      </Link>
                      {userData.role ==="admin"?
                        <Link component={LinkRoute} to={`/home/dashboard/${user}`}>
                          < DashboardIcon style={{marginLeft : "10px"}}/>
                        </Link>:""
                      }
                    </IconButton>
                  </Box>

                  <Typography><strong>USER:</strong> {user}</Typography>
                  <Typography><strong>NAME:</strong> {userData.name}</Typography>
                  <Typography><strong>EMAIL:</strong> {userData.email}</Typography>
                  <Typography><strong>PHONE:</strong> {String(userData.phone)}</Typography>
                  <Typography><strong>JOINED:</strong> {new Date(userData.created_at).toLocaleDateString()}</Typography>
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
              <OrdersUI payload={orders} />;
        </>
    )
}