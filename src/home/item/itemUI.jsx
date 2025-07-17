import {
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  Stack,
  Container,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";

export default function FullPageProductView({ item , addcart}) {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const {
    id ,
    name,
    mark,
    description,
    price,
    stock,
    image_url,
    created_at,
    category,
  } = item;

  const handleAdd = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addcart(id ,quantity)
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              bgcolor: "#f9f9f9",
            }}
          >
            <img
              src={`/${image_url}`}
              alt={name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
        </Grid>

        {/* Info Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {name}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Brand: <strong>{mark}</strong>
          </Typography>

          {category && (
            <Chip
              label={`Category: ${category}`}
              variant="outlined"
              color="secondary"
              sx={{ mb: 2 }}
            />
          )}

          <Typography variant="body1" paragraph>
            {description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Chip
              label={`$${price}`}
              color="success"
              sx={{ fontSize: "1.2rem", p: 2 }}
            />
            <Chip
              label={`Stock: ${stock}`}
              color={stock > 0 ? "primary" : "default"}
              variant="outlined"
            />
          </Stack>

          {/* Quantity Selector */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="body2">Quantity:</Typography>
            <IconButton onClick={handleRemove} disabled={quantity <= 1}>
              <RemoveIcon />
            </IconButton>
            <TextField
              size="small"
              value={quantity}
              inputProps={{ readOnly: true, style: { textAlign: "center" } }}
              sx={{ width: 60 }}
            />
            <IconButton onClick={handleAdd} disabled={quantity >= stock}>
              <AddIcon />
            </IconButton>
          </Stack>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={stock === 0}
            sx={{ mt: 1 }}
          >
            Add to Cart
          </Button>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 3 }}
          >
            Added on: {new Date(created_at).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
