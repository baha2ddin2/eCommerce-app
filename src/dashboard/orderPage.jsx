import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OrderDetailsPage() {
  const { id } = useParams(); // example: /order/5
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(id)
    const fetchOrder = async () => {
      try {
        const [orderRes, itemsRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/orders/${id}`),
          axios.get(`http://localhost:3001/api/orderItem/order/${id}`)
        ]);
        setOrder(orderRes.data);
        setItems(itemsRes.data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!order) {
    return <Typography color="error">Order not found.</Typography>;
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Order Details #{order.id}
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="subtitle1">Customer: {order.customer_name}</Typography>
        <Typography variant="subtitle1">Address: {order.address}</Typography>
        <Typography variant="subtitle1">Status: {order.status}</Typography>
      </Paper>

      <Typography variant="h6">Products</Typography>
      <Table sx={{ mt: 2 }} aria-label="order items">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.product_id}>
              <TableCell>{item.product_name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="right">
              <strong>Total</strong>
            </TableCell>
            <TableCell>
              <strong>${total}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};


