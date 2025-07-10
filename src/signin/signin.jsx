import { useRef, useState } from 'react';
import {Button,FormControl,InputLabel,OutlinedInput,TextField,InputAdornment,Card,CardContent,Alert,IconButton,Box} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

function Title() {
  return <h2 style={{ marginBottom: 8,textAlign:'center' }}>sign in</h2>;
}

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const refUser=useRef()
    const refName = useRef()
    const refEmail = useRef()
    const refPassword = useRef()
    const refCheckPassword = useRef()
    const refPhone = useRef()
    const user = refUser.current.value
    const name= refName.current.value
    const email = refEmail.current.value
    const password = refPassword.current.value
    const checkPassword = refCheckPassword.current.value
    const phone = refPhone.current.value
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowcheckPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) =>event.preventDefault();
    const handleMouseDowncheckPassword = (event) =>event.preventDefault();
    const [err,setErr] = useState(null)
    const handelsignin = (event)=>{
        event.preventDefault()
        if(password.trim.length === 0){
            setErr("")

        } else if  (password !== checkPassword){
            setErr("the password do not match")
            return
        }
        axios.post('http://localhost:3001/api/users', {
            user:user,
            name: name,
            email:email,
            password:password,
            phone: phone,
            })
            .then(function (response) {
                localStorage.setItem('token',response.data.token)
                setErr(null)
                refName.current.value = ""
                refUser.current.value = ""
                refEmail.current.value = ""
                refPassword.current.value = ""
                refCheckPassword.current.value = ""
                refPhone.current.value = ""

            })
            .catch(function (error) {
              const errorMsg = error?.response?.data?.error || 'Something went wrong. Please try again.';
              setErr(errorMsg)
            })
    }
    return (
        <>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#f9f9f9', p: 2 }}
        >
            <Card sx={{ width: 362, p: 2, boxShadow: 4 }} >
                <CardContent>
                    <Title/>
                    {err ?<Alert sx={{ mb: 2, px: 1, py: 0.25, width: '95%' }} severity="error">
                        {err}
                    </Alert> :""}
                    <TextField
                        label="User Name"
                        type="text"
                        size="small"
                        inputRef={refUser}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Name"
                        type="text"
                        size="small"
                        inputRef={refName}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    {/* Email Field */}
                    <TextField
                        id="input-with-icon-textfield"
                        label="Email"
                        inputRef={refEmail}
                        type="email"
                        size="small"
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <AccountCircle fontSize="inherit" />
                            </InputAdornment>
                        ),
                        }}
                    />
                    {/* Password Field */}
                    <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                        <InputLabel size="small" htmlFor="outlined-adornment-password">
                        Password
                        </InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        inputRef={refPassword}
                        size="small"
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="small">
                                {showPassword ? (
                                <VisibilityOff fontSize="inherit" />
                                ) : (
                                <Visibility fontSize="inherit" />
                                )}
                            </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        />
                    </FormControl>
                    {/* Password check Field */}
                    <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                        <InputLabel size="small" htmlFor="outlined-adornment-password">
                        check Password
                        </InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        inputRef={refCheckPassword}
                        size="small"
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowcheckPassword}
                                onMouseDown={handleMouseDowncheckPassword}
                                edge="end"
                                size="small"
                            >
                                {showPassword ? (
                                <VisibilityOff fontSize="inherit" />
                                ) : (
                                <Visibility fontSize="inherit" />
                                )}
                            </IconButton>
                            </InputAdornment>
                        }
                        label="check Password"
                        />
                    </FormControl>

                    {/* phone Field */}
                    <TextField
                        id="input-with-icon-textfield"
                        label="Phone"
                        inputRef={refPhone}
                        type="phone"
                        size="small"
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="outlined"
                        color="info"
                        size="small"
                        disableElevation
                        fullWidth
                        onClick={handelsignin}
                        sx={{ my: 2 }}> sign in </Button>
                </CardContent>
            </Card>
            {res}
        </Box>
        </>
  );
}
