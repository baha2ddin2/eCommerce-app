import { useState } from 'react';
import {Button,FormControl,InputLabel,OutlinedInput,TextField,InputAdornment,Card,CardContent,Alert,IconButton,Box} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Title() {
  return <h2 style={{ marginBottom: 8,textAlign:'center' }}>sign in</h2>;
}

function Subtitle() {
  return (
    <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '95%' }} severity="warning">
      We are investigating an ongoing outage.
    </Alert>
  );
}


export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
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
                    <Subtitle/>
                    <TextField
                        label="User Name"
                        name="user"
                        type="text"
                        size="small"
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Name"
                        name="name"
                        type="text"
                        size="small"
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    {/* Email Field */}
                    <TextField
                        id="input-with-icon-textfield"
                        label="Email"
                        name="email"
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
                        name="password"
                        size="small"
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
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
                        name="checkPassword"
                        size="small"
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
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
                        name="phone"
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
                        sx={{ my: 2 }}
                    >
                        sign in
                    </Button>
                </CardContent>
            </Card>
        </Box>
        </>
  );
}
