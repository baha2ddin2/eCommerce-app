import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Link,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Allproduct } from "../../slices/product";
import { Link as RouterLink } from "react-router-dom";

// Group products by category
const groupByCategory = (products) => {
  const grouped = {};
  for (const product of products) {
    const category = product.category || "Uncategorized";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(product);
  }
  return grouped;
};

export default function HomePage() {
    const dataProducts = useSelector((state)=>state.product.data) ||[]
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(Allproduct())
    },[dispatch])

    const groupedProducts = groupByCategory(dataProducts);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url('/banner.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          mb: 4,
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" color="white" gutterBottom>
            Discover Our Best Products
          </Typography>
          <Link component={RouterLink} underline="none" to={`all-products`}>
            <Button variant="contained" color="secondary" size="large">
              See All Products
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Dynamic Categories */}
      {Object.entries(groupedProducts).map(([categoryName, products]) => (
        <Box key={categoryName} sx={{ mb: 6, px: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">
              {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </Typography>
            <Link component={RouterLink} underline="none" to={`category/${categoryName}`}>
              <Button variant="outlined" size="small">
                See All
              </Button>
            </Link>
          </Box>
          <Grid container spacing={2}>
            {products.slice(0, 5).map((product) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={product.id}>
                <Link component={RouterLink} underline="none" to={`item/${product.id}`}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`/images/${product.image_url}`}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.mark}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      {product.price}
                    </Typography>
                    {product.average_rating && (
                      <Box sx={{ mt: 1 }}>
                        <Rating
                          value={parseFloat(product.average_rating)}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography variant="caption" color="text.secondary">
                          ({product.total_reviews})
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
