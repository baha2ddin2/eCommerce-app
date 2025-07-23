import React, { useState } from 'react';
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { creatItems, creatOrder } from '../../slices/orders';
import { useParams } from 'react-router-dom';

const steps = ['Address', 'Review Products', 'Success'];

export default function SimpleCheckoutStepper() {
  const {user} =useParams()
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch()

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!address.trim()) {
        setError('Address is required');
        return;
      }
      dispatch(creatOrder({adress :address , user })).unwrap()
      .then(()=>{
        setActiveStep((prev) => prev + 1);
        setError('');
      })
    }
    if (activeStep === steps.length - 2) {
      // Last step before success: Place order logic here if needed
      dispatch(creatItems()).unwrap()
      .then(()=>{
        setActiveStep(activeStep + 1);
        return
      })
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 3 }}>
        {activeStep === 0 && (
          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!error}
            helperText={error}
            autoFocus
          />
        )}

        {activeStep === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              Review Your Products
            </Typography>
            <List>
              {cartItems.length === 0 ? (
                <Typography>No products in the cart.</Typography>
              ) : (
                cartItems.map((item) => (
                  <ListItem key={item.cart_id} divider>
                    <ListItemText
                      primary={item.product_name}
                      secondary={`Quantity: ${item.quantity} × $${item.price} = $${item.total_line_price}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </>
        )}

        {activeStep === 2 && (
          <Typography
            variant="h5"
            align="center"
            color="success.main"
            sx={{ mt: 4 }}
          >
            🎉 Your order has been placed successfully!
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button disabled={activeStep === 0 || activeStep === 2} onClick={handleBack}>
            Back
          </Button>

          {activeStep < steps.length - 2 && (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}

          {activeStep === steps.length - 2 && (
            <Button
              variant="contained"
              color="success"
              onClick={handleNext}
            >
              Place Order
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
