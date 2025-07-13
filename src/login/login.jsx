import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,FormControl,Checkbox,FormControlLabel,InputLabel,OutlinedInput,TextField,InputAdornment,Link,Alert,IconButton,} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {AppProvider} from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../slices/user';


const providers = [{id: 'credentials', name: 'Email and Password'}];


function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
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
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Log In
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="signin" variant="body2">
      Sign up
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/forgot-password" variant="body2">
      Forgot password?
    </Link>
  );
}

function Title() {
  return <h2 style={{ marginBottom: 8 }}>Login</h2>;
}

function RememberMeCheckbox() {
  const theme = useTheme();
  return (
    <FormControlLabel
      label="Remember me"
      control={
        <Checkbox
          name="remember"
          value="true"
          color="primary"
          sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
        />
      }
      slotProps={{
        typography: {
          color: 'textSecondary',
          fontSize: theme.typography.pxToRem(14),
        },
      }}
    />
  );
}

export default function Login() {
  const dispatch = useDispatch();
  const reduxError = useSelector((state) => state.user.error);
  const navigate = useNavigate()
  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={async (provider, formData) =>{
          const email = formData.get("email");
          const password = formData.get("password");

          const resultAction = await dispatch(loginUser({ email, password }));

          if (loginUser.fulfilled.match(resultAction)) {
            navigate("/home");

          }

        }}

        slots={{
          title: Title,
          subtitle: () =>{
            return(
          reduxError &&(
            <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '100%' }} severity="error">
              {reduxError}
            </Alert>
          ))},
          emailField: CustomEmailField,
          passwordField: CustomPasswordField,
          submitButton: CustomButton,
          signUpLink: SignUpLink,
          rememberMe: RememberMeCheckbox,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        slotProps={{ form: { noValidate: true } }}
        providers={providers}
      />
    </AppProvider>
  );
}
