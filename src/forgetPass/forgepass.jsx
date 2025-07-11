import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,TextField,InputAdornment,Alert,} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

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
  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={( provider, formData) =>
          axios.post("http://localhost:3001/api/password/reset",{
            email : formData.get("email")
          })
          .then(function (response) {
              setErr(null)
              navigate('/succes-page')
            })
            .catch(function (error) {
              const errorMsg = error.response.data.det || 'Something went wrong. Please try again.';
              setErr(errorMsg)
            }
            )
        }
        slots={{
          title: Title,
          subtitle: err && (()=>{
            return (
              <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '100%' }} severity="error">
                {err}
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