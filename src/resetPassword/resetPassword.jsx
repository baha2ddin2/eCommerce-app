import { useRef, useState  } from 'react';
import {Button,FormControl,InputLabel,OutlinedInput,InputAdornment,Card,CardContent,Alert,IconButton,Box} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useParams, useNavigate } from 'react-router-dom';

import {useDispatch ,useSelector} from 'react-redux'
import  {resetPassword} from '../slices/user'

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const {user ,token} =useParams()
    const refPassword = useRef()
    const refCheckPassword = useRef()

    const navigate = useNavigate();
    const reduxError = useSelector(state => state.user.error);
    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowcheckPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) =>event.preventDefault();
    const handleMouseDowncheckPassword = (event) =>event.preventDefault();
    const [err,setErr] = useState(null)
    const handelsignin = async(event)=>{

        event.preventDefault()
        const password = refPassword.current.value
        const checkPassword = refCheckPassword.current.value

        function validateInputs({  password, checkPassword }) {
            if (!password || !checkPassword ) {
                return 'All fields are required';
            }

            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
            if (!passwordRegex.test(password)) {
                return 'Password must be at least 6 characters and include letters and numbers';
            }

            if (password !== checkPassword) {
                return 'Passwords do not match';
            }

            return null;
        }
        const validationError = validateInputs({ password, checkPassword});
        if (validationError) {
            setErr(validationError);
            return;
        }
        try {
            const response = await dispatch(resetPassword({user,token,password}))
            if (resetPassword.fulfilled.match(response)){
                refCheckPassword.current.value = ""
                refPassword.current.value = ""
                setErr(null)
                navigate('/')
            }else{
                setErr(response.payload || "Something went wrong.Please try again.");
            }
        } catch (error) {
            setErr("Unexpected error");
        }
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
                    <h2 style={{ marginBottom: 8,textAlign:'center' }}>change your password</h2>
                    { err||reduxError ? <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '95%' }} severity="error">{err||reduxError}</Alert> :""}
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
        </Box>
        </>
  );
}
