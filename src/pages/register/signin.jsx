import { useRef, useState   } from 'react';
import {Button,FormControl,InputLabel,OutlinedInput,TextField,InputAdornment,Card,CardContent,Alert,IconButton,Box} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../slices/user';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reduxError = useSelector(state => state.user.error);

    const [showPassword, setShowPassword] = useState(false);
    const refUser=useRef()
    const refName = useRef()
    const refEmail = useRef()
    const refPassword = useRef()
    const refCheckPassword = useRef()
    const refPhone = useRef()

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowcheckPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) =>event.preventDefault();
    const handleMouseDowncheckPassword = (event) =>event.preventDefault();
    const [err,setErr] = useState(null)
    const handelsignin = async (event)=>{
        event.preventDefault()
        const user = refUser.current.value
        const name= refName.current.value
        const email = refEmail.current.value
        const password = refPassword.current.value
        const checkPassword = refCheckPassword.current.value
        const phone = refPhone.current.value

        function validateInputs({ user, name, email, password, checkPassword, phone }) {
            if (!user || !name || !email || !password || !checkPassword || !phone) {
                return 'All fields are required';
            }
            const userRegex = /^[a-zA-Z0-9_]{3,20}$/;
            if (!userRegex.test(user)) {
                return 'Username must be 3–20 characters (letters, numbers, underscores)';
            }

            const nameRegex = /^[a-zA-Z ]{2,40}$/;
            if (!nameRegex.test(name)) {
                return 'Name must contain only letters and spaces (2–40 characters)';
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return 'Invalid email format';
            }

            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
            if (!passwordRegex.test(password)) {
                return 'Password must be at least 6 characters and include letters and numbers';
            }

            if (password !== checkPassword) {
                return 'Passwords do not match';
            }

            const phoneRegex = /^(06|07)\d{8}$/;
            if (!phoneRegex.test(phone)) {
                return 'Phone must be a valid Moroccan number (starts with 06 or 07, 10 digits)';
            }

            return null;
        }

         const validationError = validateInputs({ user, name, email, password, checkPassword, phone });
        if (validationError) {
            setErr(validationError);
            return;
        }
        dispatch(registerUser({ user, name, email, password, phone })).unwrap().then(()=>{
            setErr(null);
            refUser.current.value = "";
            refName.current.value = "";
            refEmail.current.value = "";
            refPassword.current.value = "";
            refCheckPassword.current.value = "";
            refPhone.current.value = "";
            navigate("/home");
        })
    };
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
                    <h2 style={{ marginBottom: 8,textAlign:'center' }}>sign in</h2>
                    {err||reduxError ? <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '95%' }} severity="error">{err||reduxError}</Alert> :""}
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
        </Box>
        </>
  );
}
