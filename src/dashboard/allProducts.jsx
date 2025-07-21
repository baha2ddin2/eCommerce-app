import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Stack,
  Rating
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    mark: "Logitech",
    price: "25.99",
    stock: 50,
    category: "phones",
    image_url: "mouse.jpg",
    average_rating: "5.0",
    total_reviews: 1
  },
  {
    id: 2,
    name: "Keyboard",
    mark: "Corsair",
    price: "45.50",
    stock: 30,
    category: "laptops",
    image_url: "keyboard.jpg",
    average_rating: null,
    total_reviews: 0
  },
  {
    id: 3,
    name: "USB-C Charger",
    mark: "Anker",
    price: "19.99",
    stock: 100,
    category: "airpots",
    image_url: "charger.jpg",
    average_rating: null,
    total_reviews: 0
  }
];

export default function AllProductsPage() {
  return (
    <Box p={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">🛒 All Products</Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="primary">
          Add Product
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={`/images/${product.image_url}`} // Update path based on your server
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Brand:</strong> {product.mark}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Category:</strong> {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Stock:</strong> {product.stock}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Price:</strong> ${product.price}
                </Typography>
                <Stack direction="row" alignItems="center" mt={1}>
                  <Rating
                    value={parseFloat(product.average_rating) || 0}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" ml={1}>
                    ({product.total_reviews} reviews)
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
