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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CartList({ cartItems, onDelete, onIncrease, onDecrease }) {
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
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onDecrease(item.cart_id)}
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onIncrease(item.cart_id)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
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

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}