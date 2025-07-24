import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Alert from '@mui/material/Alert';
import { addProduct, uploadPicture } from "../../slices/product";

const categories = ["Electronics", "Clothing", "Books", "Phones", "Others"];

export default function AddProductForm({ onSubmit }) {
    const dispatch = useDispatch()
     const [visibleAlert,setVisibleAlert]=useState(false)
  const [form, setForm] = useState({
    name: "",
    mark: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({
        name : form.name,
        mark : form.mark ,
        category :form.category,
        description : form.description,
        price : form.price,
        stock : form.stock
    })).unwrap().then((results)=>{
        console.log(results)
        dispatch(uploadPicture({file : form.image , id : results.id })).unwrap()
        .then(()=>{
          setVisibleAlert(true)
        setTimeout(()=>{
          setVisibleAlert(false)
        },3000)
        })
    })
    if (onSubmit) onSubmit(form);
    console.log("Product Submitted:", form);
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Product
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
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            required
          />
          <TextField
            label="Price ($)"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
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
            value={form.stock}
            onChange={handleChange}
            type="number"
            required
            fullWidth
          />
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              name="image"
              hidden
              accept="image/*"
              onChange={handleChange}
            />
          </Button>
          {form.image && <Typography>{form.image.name}</Typography>}
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </Stack>
      </Box>
      {visibleAlert &&(
                      <Alert sx={{
                        position: 'fixed',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'fit-content',
                        fontSize: '0.8rem',
                        zIndex: 1300,
                        }} severity="success">
                        you add the product to the store  successfully
                      </Alert>
                    )
      }
    </Paper>
  );
}
