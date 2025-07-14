import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Container,
  Button,
  Box,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartList({ cartItems, onDelete }) {
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.total_line_price),
    0
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card
              key={item.cart_id}
              variant="outlined"
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box>
                <Typography variant="h6">{item.product_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2">
                  Price: ${item.price} × {item.quantity}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Total: ${item.total_line_price}
                </Typography>
              </Box>

              <IconButton color="error" onClick={() => onDelete(item.cart_id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" align="right">
            Cart Total: ${total.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}
