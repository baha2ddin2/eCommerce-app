import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Allproduct } from "../../slices/product";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Slider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Link,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams(); // comes from the route
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.product.data) || [];

  useEffect(() => {
    dispatch(Allproduct());
  }, [dispatch]);

  const handlePriceChange = (_, newValue) => setPriceRange(newValue);
  const handleRatingChange = (_, newValue) => setRating(newValue);
  const handleSortChange = (e) => setSort(e.target.value);

  const filteredProducts = productData
    .filter((product) => product.category === category)
    .filter(
      (product) =>
        Number(product.price) >= priceRange[0] &&
        Number(product.price) <= priceRange[1]
    )
    .filter((product) => Number(product.average_rating || 0) >= rating)
    .sort((a, b) => {
      if (sort === "priceLow") return Number(a.price) - Number(b.price);
      if (sort === "priceHigh") return Number(b.price) - Number(a.price);
      if (sort === "rating")
        return Number(b.average_rating || 0) - Number(a.average_rating || 0);
      return 0;
    });

  return (
    <Box display="flex" p={2}>
      {/* Sidebar Filter */}
      <Box width="250px" mr={4}>
        <Typography variant="h6">Filter</Typography>

        <Typography gutterBottom mt={2}>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />

        <Typography gutterBottom mt={2}>
          Minimum Rating
        </Typography>
        <Rating
          name="rating"
          value={rating}
          precision={0.5}
          onChange={handleRatingChange}
        />

        <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sort} onChange={handleSortChange} label="Sort By">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="priceLow">Price: Low to High</MenuItem>
            <MenuItem value="priceHigh">Price: High to Low</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Link
              component={RouterLink}
              to={`/home/item/${product.id}`}
              underline="none"
            >
              <Card>
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{ width: "100%", height: 180, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${product.price}
                  </Typography>
                  <Rating
                    value={Number(product.average_rating || 0)}
                    precision={0.5}
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    color={product.stock === 0 ? "error" : "text.primary"}
                  >
                    {product.stock === 0
                      ? "Sold Out"
                      : `In Stock: ${product.stock}`}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
