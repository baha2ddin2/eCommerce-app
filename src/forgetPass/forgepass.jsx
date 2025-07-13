import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,TextField,InputAdornment,Alert,} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import { forgetPassword } from '../slices/user';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

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

function Title() {
  return <h2 style={{ marginBottom: 8 }}>send email reset password</h2>;
}

export default function ForgotPassword() {
  const [err,setErr]=React.useState(null)
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const reduxError = useSelector(state => state.user.error);
  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={async ( provider, formData) =>{
            try{
              const email =formData.get("emaill")
              const result = await dispatch(forgetPassword({email}))
              if (forgetPassword.fulfilled.match(result)){
                setErr(null)
                navigate("/succes-page")
              }else{
                setErr(result.payload || 'Something went wrong. Please try again.' )
              }
            }catch(err){
              setErr("Unexpected error");
            }

        }}
        slots={{
          title: Title,
          subtitle: (err||reduxError) && (()=>{
            return (
              <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '100%' }} severity="error">
                {err||reduxError}
              </Alert>
            )}),
          emailField: CustomEmailField,
          passwordField: () => null,
          submitButton: ()=>{
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
                send
              </Button>
            );
          },
        }}
        slotProps={{ form: { noValidate: true } }}
        providers={providers}
      />
    </AppProvider>
  );
}