import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Link,
  Stack,
  Rating
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouteLink  } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AllProductsPage() {

  const products = useSelector((state)=>state.product.data)||[]
  return (
    <Box p={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">🛒 All Products</Typography>
        <Link component={RouteLink} to={`/home/dashboard/bahae22/add-product`} underline="none">
          <Button variant="contained" startIcon={<AddIcon />} color="primary">
            Add Product
          </Button>
        </Link>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={product.image_url} // Update path based on your server
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
