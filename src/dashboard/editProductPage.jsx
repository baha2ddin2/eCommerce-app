import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Paper,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct, productItem } from "../slices/product";
import { useNavigate, useParams } from "react-router-dom";

const categories = ["Electronics", "Clothing", "Books", "Phones", "Others"];

export default function EditProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.dataItem) || {};

  const [form, setForm] = useState({
    name: "",
    mark: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  // Load product data
  useEffect(() => {
    dispatch(productItem({ id }));
  }, [dispatch, id]);

  // Sync product data to form
  useEffect(() => {
    if (product && product.id) {
      setForm({
        name: product.name || "",
        mark: product.mark || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
        image: null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct({
        id : id,
        name : form.name ,
        mark : form.mark,
        price : form.price,
        category : form.category ,
        stock : form.stock
    })).unwrap().then(()=>{
        navigate("/home/dashboard/bahae22/all-products");
    })
  };

  const handleDelete = () => {
    dispatch(deleteProduct({ id }))
      .unwrap()
      .then(() => {
        navigate("/home/dashboard/bahae22/all-products");
      });
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Mark / Brand"
            name="mark"
            value={form.mark}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Price ($)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Stock Quantity"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
            fullWidth
          />

          {/* Image Preview + Upload */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={
                form.image
                  ? URL.createObjectURL(form.image)
                  : product.image_url
              }
              alt="Product"
              sx={{ width: 56, height: 56 }}
              variant="rounded"
            />
            <Button variant="contained" component="label">
              Change Image
              <input
                type="file"
                hidden
                accept="image/*"
                name="image"
                onChange={handleChange}
              />
            </Button>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
            >
              Delete Product
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
